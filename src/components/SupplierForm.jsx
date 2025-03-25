import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Group,
  LoadingOverlay,
  ScrollArea,
  Select,
  Text,
  TextInput,
  Textarea,
  createStyles,
} from "@mantine/core";
import { useContext } from "react";

import { IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { AuthContext } from "core/context";
import { validationSupplierItem } from "shared/supplierItem.validation";
import supplierService from "services/supplier.service";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles(() => ({}));

function SupplierForm(props) {
  const { close, opened, formSubmitted, editItemId } = props;
  const { theme } = useStyles();
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const filterForm = useForm({
    validate: yupResolver(validationSupplierItem),
    initialValues: {
      itemName: "",
      description: "",
      materialType: "",
      quantityInMeters: null,
      price: null,
    },
  });

  const handleSupplierFormSubmit = (values) => {
    if (authData) {
      setLoading(true);

      if (editItemId === null) {
        supplierService
          .addMaterialItem({
            itemName: values.itemName,
            description: values.description,
            materialType: values.materialType,
            quantityInMeters: +values.quantityInMeters,
            price: +values.price,
            supplierId: authData.userId,
          })
          .then((res) => {
            if (res.data.status === "success") {
              setTimeout(() => {
                setLoading(false);
                formSubmitted();
                filterForm.reset();
                close();
              }, 1000);
              showNotification({
                message: "Material item added successfully.",
                icon: <IconCircleCheckFilled size={16} />,
                color: "teal",
                styles: () => ({
                  root: {
                    marginTop: "2rem",
                    padding: "1.2rem 0.5rem",
                  },
                }),
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log("supplier form error", error);
          });
      } else {
        supplierService
          .updateMaterialItem(values, editItemId)
          .then((res) => {
            if (res.status === "success") {
              setTimeout(() => {
                setLoading(false);
                formSubmitted();
                filterForm.reset();
                close();
              }, 1000);
              showNotification({
                message: "Material item updated successfully.",
                icon: <IconCircleCheckFilled size={16} />,
                color: "teal",
                styles: () => ({
                  root: {
                    marginTop: "2rem",
                    padding: "1.2rem 0.5rem",
                  },
                }),
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log("ERROR update", error);
          });
      }
    }
  };

  useEffect(() => {
    if (opened && editItemId !== null) {
      setLoading(true);
      console.log("editItemId", editItemId);
      supplierService
        .getMaterialItemByID(editItemId)
        .then((res) => {
          setLoading(false);
          if (res.data && res.data.materialItem)
            filterForm.setValues({
              itemName: res.data.materialItem.itemName,
              description: res.data.materialItem.description,
              materialType: res.data.materialItem.materialType,
              quantityInMeters: res.data.materialItem.quantityInMeters,
              price: res.data.materialItem.price,
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log("ERROR", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, editItemId]);
  return (
    <Drawer
      opened={opened}
      onClose={close}
      size={500}
      position="right"
      closeOnEscape={false}
      withCloseButton={false}
      styles={{ body: { height: "100%", padding: 0 } }}
      closeOnClickOutside={false}
      overlayProps={{ opacity: 0.4, blur: 3 }}
      transitionProps={{
        transition: "slide-left",
        duration: 90,
        timingFunction: "linear",
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={1} />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "hidden",
        }}
        onSubmit={filterForm.onSubmit((values) => {
          handleSupplierFormSubmit(values);
        })}
      >
        <Group
          style={{
            borderBottom: `1px solid ${theme.colors.gray[3]}`,
            padding: "0.5rem 1rem",
            height: "3rem",
          }}
          position="apart"
        >
          <Text size="lg" style={{ fontWeight: 600 }}>
            {editItemId === null ? "Add " : "Edit"} Item
          </Text>
          <IconX onClick={close} style={{ cursor: "pointer" }} size={20} />
        </Group>

        <ScrollArea h="100%">
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <TextInput
              label="Item name"
              placeholder="Item name"
              {...filterForm.getInputProps("itemName")}
            />
            <Textarea
              rows={3}
              label="Item description"
              {...filterForm.getInputProps("description")}
            />
            <Select
              placeholder="Select Material Type"
              label="Material type"
              clearable
              data={[
                "Textile",
                "Velvet",
                "Silk",
                "Linen",
                "Denim",
                "Nylon",
                "Cotton",
                "Muslin",
                "Chiffon",
              ]}
              {...filterForm.getInputProps("materialType")}
              onChange={(e) => {
                if (e) {
                  filterForm.setFieldValue("materialType", e);
                } else {
                  filterForm.setFieldValue("materialType", "");
                }
              }}
            />
            <TextInput
              type="number"
              label="Quantity (in Meters)"
              placeholder="Quantity"
              {...filterForm.getInputProps("quantityInMeters")}
            />
            <TextInput
              type="number"
              label="Price (per Meter)"
              placeholder="Price"
              {...filterForm.getInputProps("price")}
            />
          </Box>
        </ScrollArea>

        <Box
          style={{
            display: "flex",
            gap: "0.5rem",
            borderTop: `1px solid ${theme.colors.gray[3]}`,
            justifyContent: "flex-end",
            padding: "0.75rem 0.75rem",
          }}
        >
          <Button
            type="button"
            onClick={() => {
              filterForm.reset();
              close();
            }}
            variant="outline"
            style={{
              fontWeight: 600,
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            CANCEL
          </Button>
          <Button type="submit" style={{ fontWeight: 600 }}>
            {editItemId === null ? "SAVE " : "UPDATE"}
          </Button>
        </Box>
      </form>
    </Drawer>
  );
}

export default SupplierForm;
