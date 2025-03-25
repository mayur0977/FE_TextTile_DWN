import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  ScrollArea,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
  createStyles,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import ProductAddEditForm from "components/ProductAddEditForm";

import { AuthContext } from "core/context";
import { useContext, useEffect, useState } from "react";
import productService from "services/product.service";

/**
 * export interface ITextileProduct {
    name: string;
    description: string;
    category: string;
    brand: string;
    color: string;
    price: number;
    unit: string;
  
    stock_quantity: number;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height?: number; // Optional field for height if applicable
    };
    composition: string;
    suitable_for: string[];
    care_instructions: string;
    origin: string;
    sustainability_rating: string;
    texture: string;
    fire_retardant: boolean;
    water_resistant: boolean;
    pattern: string;
    created_at: Date;
    updated_at: Date;
    tags: string[];
  }
 */

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

function ManufacturerDashboard() {
  const { classes, cx } = useStyles();
  const { authData } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [productItemList, setProductItemList] = useState([]);
  const [editItemId, setItemEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSupplierFormSubmit = () => {
    if (authData) {
      setLoading(true);
      //   supplierService
      //     .getAllMaterialItemsBySupplierId(authData.userId)
      //     .then((res) => {
      //       setLoading(false);
      //       if (res.data) {
      //         setMaterialItemList(res.data.materialItems);
      //       }
      //     })
      //     .catch((error) => {
      //       setLoading(false);
      //       console.log("ERROR", error);
      //     });
    }
  };
  const handleDeleteMaterialItem = (itemId) => {
    if (authData) {
      //   supplierService
      //     .deleteMaterialItem(itemId)
      //     .then((res) => {
      //       if (res.status === "success") {
      //         showNotification({
      //           message: "Material item removed successfully.",
      //           icon: <IconCircleCheckFilled size={16} />,
      //           color: "teal",
      //           styles: () => ({
      //             root: {
      //               marginTop: "2rem",
      //               padding: "1.2rem 0.5rem",
      //             },
      //           }),
      //         });
      //         handleSupplierFormSubmit();
      //       }
      //     })
      //     .catch((error) => {
      //       console.log("ERROR", error);
      //     });
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
      productService
        .getAllProducts()
        .then((res) => {
          setLoading(false);
          console.log("res", res);

          if (res.data) {
            setProductItemList(res.data);
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

        <ProductAddEditForm
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
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {productItemList.map((item) => (
              <Card shadow="md" padding="lg" radius="md" withBorder>
                <Stack spacing="md">
                  {/* <Image
                    src={fabricData.image_url}
                    height={200}
                    fit="cover"
                    alt={fabricData.name}
                    radius="md"
                  /> */}

                  <Group position="apart">
                    <Title order={3}>{item.name}</Title>
                    <Badge color="pink" variant="light">
                      {item.category}
                    </Badge>
                  </Group>

                  <Text color="dimmed" size="sm">
                    {item.description}
                  </Text>

                  <Group spacing="xs" mt="xs">
                    {item.suitable_for.map((tag) => (
                      <Badge key={tag} color="blue" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>

                  <Stack spacing={4} mt="sm">
                    <Text size="sm">
                      <b>Brand:</b> {item.brand}
                    </Text>
                    <Text size="sm">
                      <b>Color:</b> {item.color}
                    </Text>
                    <Text size="sm">
                      <b>Pattern:</b> {item.pattern}
                    </Text>
                    <Text size="sm">
                      <b>Texture:</b> {item.texture}
                    </Text>
                    <Text size="sm">
                      <b>Composition:</b> {item.composition}
                    </Text>
                    <Text size="sm">
                      <b>Care:</b> {item.care_instructions}
                    </Text>
                    <Text size="sm">
                      <b>Origin:</b> {item.origin}
                    </Text>
                    <Text size="sm">
                      <b>Price:</b> ${item.price}/{item.unit}
                    </Text>
                    <Text size="sm">
                      <b>Stock:</b> {item.stock_quantity} units
                    </Text>
                    <Text size="sm">
                      <b>Weight:</b> {item.weight} kg
                    </Text>
                    <Text size="sm">
                      <b>Dimensions:</b> {item.dimensions.length} x{" "}
                      {item.dimensions.width} cm
                    </Text>
                    <Text size="sm">
                      <b>Sustainability:</b> {item.sustainability_rating}
                    </Text>
                  </Stack>

                  <Group spacing="lg" mt="md">
                    <Tooltip label="Is the fabric fire-retardant?" withArrow>
                      <Switch
                        label="Fire Retardant"
                        checked={item.fire_retardant}
                        readOnly
                      />
                    </Tooltip>
                    <Tooltip label="Is the fabric water-resistant?" withArrow>
                      <Switch
                        label="Water Resistant"
                        checked={item.water_resistant}
                        readOnly
                      />
                    </Tooltip>
                  </Group>

                  <Divider my="sm" />

                  <Button fullWidth variant="light" color="teal">
                    Order Now
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Box>
    </>
  );
}

export default ManufacturerDashboard;
