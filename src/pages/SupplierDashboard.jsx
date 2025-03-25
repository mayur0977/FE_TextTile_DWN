import {
  Box,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  ScrollArea,
  Table,
  Text,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import {
  IconCircleCheckFilled,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import SupplierForm from "components/SupplierForm";
import { AuthContext } from "core/context";
import React, { useContext, useEffect, useState } from "react";
import supplierService from "services/supplier.service";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backgroundColor: theme.colors.gray[1],
  },
  tableContainer: {
    borderCollapse: "separate",
    borderSpacing: "0 5px",
    "thead tr th": {
      borderBottom: 0,
      padding: "10px",
      borderRight: `0.5px solid ${theme.colors.gray[3]} `,
    },
    "thead > tr > th:last-of-type": {
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px",
      position: "sticky",
      backgroundColor: theme.colors.gray[1],
      right: "-0.5rem",
    },
    "tbody tr:first-of-type td": {
      borderTop: "1px",
      borderTopStyle: "solid",
      borderTopColor: theme.colors.gray[4],
    },
    "tbody > tr > td:first-of-type": {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      borderLeft: "1px",
      borderLeftStyle: "solid",
      borderLeftColor: theme.colors.gray[4],
      // position: "sticky",
      // left: 0
    },
    "tbody > tr > td:last-of-type": {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
      borderRight: "1px",
      width: "40px",
      minWidth: "40px",
      maxWidth: "40px",
      borderLeft: `0.5px solid ${theme.colors.gray[1]} `,
      borderRightStyle: "solid",
      borderRightColor: theme.colors.gray[4],
    },
    "tbody > tr ": {
      boxShadow: "2px 4px 10px -5px rgba(0, 0, 0, 0.1)",
    },
    "tbody > tr > td": {
      fontWeight: 600,
      padding: "12px",
      verticalAlign: "middle",
      fontSize: "13px",
      // minWidth: "100px",
      borderTop: "1px",
      borderBottom: "1px",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopColor: theme.colors.gray[4],
      borderBottomColor: theme.colors.gray[4],
      borderRight: `0.5px solid ${theme.colors.gray[1]} `,
    },
  },
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  subHeaderContainer: {
    display: "flex",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderBottomColor: theme.colors.gray[3],
  },
}));
function SupplierDashboard() {
  const { classes, cx } = useStyles();
  const { authData } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [materialItemList, setMaterialItemList] = useState([]);
  const [editItemId, setItemEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSupplierFormSubmit = () => {
    if (authData) {
      setLoading(true);
      supplierService
        .getAllMaterialItemsBySupplierId(authData.userId)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setMaterialItemList(res.data.materialItems);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("ERROR", error);
        });
    }
  };
  const handleDeleteMaterialItem = (itemId) => {
    if (authData) {
      supplierService
        .deleteMaterialItem(itemId)
        .then((res) => {
          if (res.status === "success") {
            showNotification({
              message: "Material item removed successfully.",
              icon: <IconCircleCheckFilled size={16} />,
              color: "teal",
              styles: () => ({
                root: {
                  marginTop: "2rem",
                  padding: "1.2rem 0.5rem",
                },
              }),
            });
            handleSupplierFormSubmit();
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  };

  const openDeleteModal = (itemId, name) =>
    modals.openConfirmModal({
      title: "Delete Item",
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{name}</strong>?
        </Text>
      ),
      labels: { confirm: "Delete ", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => handleDeleteMaterialItem(itemId),
    });

  useEffect(() => {
    if (authData) {
      setLoading(true);
      supplierService
        .getAllMaterialItemsBySupplierId(authData.userId)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setMaterialItemList(res.data.materialItems);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("ERROR", error);
        });
    }
  }, [authData]);

  return (
    <>
      <Box px="lg" className={classes.subHeaderContainer} bg="transparent">
        <Flex
          justify="flex-end"
          wrap="wrap"
          py="md"
          align="center"
          rowGap={12}
          w="100%"
        >
          <Button
            type="button"
            style={{ padding: " 0.5rem 0.75rem" }}
            variant="outline"
            onClick={() => {
              open();
              setItemEditId(null);
            }}
          >
            <Group spacing={2}>
              <IconPlus size={16} /> <Text>Add Item</Text>
            </Group>
          </Button>
        </Flex>

        <SupplierForm
          close={close}
          opened={opened}
          formSubmitted={handleSupplierFormSubmit}
          editItemId={editItemId}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ScrollArea px="lg" style={{ height: "100%" }} type="auto">
          <LoadingOverlay visible={loading} overlayBlur={6} />
          <Table
            className={classes.tableContainer}
            withBorder={false}
            withColumnBorders={false}
          >
            <thead className={cx(classes.header)}>
              <tr>
                <th>ITEM NAME</th>
                <th>DESCRIPTION</th>
                <th>MATERIAL TYPE</th>
                <th>QUANTITY (in meters)</th>
                <th>PRICE (per meter)</th>
                <th>
                  {" "}
                  <span />
                </th>
              </tr>
            </thead>
            <tbody>
              {materialItemList.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: "1.25rem",
                          lineHeight: "1.75rem",
                        }}
                      >
                        No records available.
                      </Text>
                    </div>
                  </td>
                </tr>
              )}
              {materialItemList &&
                materialItemList.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.description}</td>
                    <td>{item.materialType}</td>
                    <td>{item.quantityInMeters}</td>
                    <td>{item.price}</td>
                    <td
                      style={{
                        fontWeight: 600,
                        backgroundColor: "white",
                        position: "sticky",
                        padding: "0.75rem",
                        cursor: "pointer",
                        right: "-0.5rem",
                      }}
                    >
                      <IconPencil
                        size={18}
                        color="green"
                        style={{ marginRight: "18px" }}
                        onClick={() => {
                          open();
                          setItemEditId(item._id);
                        }}
                      />
                      <IconTrash
                        size={18}
                        color="red"
                        onClick={() => {
                          openDeleteModal(item._id, item.itemName);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}

export default SupplierDashboard;
