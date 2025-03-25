import {
  Box,
  Button,
  Drawer,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Switch,
  TextInput,
  Textarea,
  Divider,
  createStyles,
} from "@mantine/core";

import { useContext, useEffect, useState } from "react";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { AuthContext } from "core/context";
import supplierService from "services/supplier.service";

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

const useStyles = createStyles(() => ({}));

const initialData = {
  name: "Spandex Fabric",
  description: "Stretchable spandex fabric, ideal for activewear and sports.",
  category: "Spandex",
  brand: "Sporty Fabrics",
  color: "Red",
  price: 4.99,
  unit: "yard",
  image_url: "http://example.com/images/spandex_fabric.jpg",
  stock_quantity: 600,
  weight: 0.05,
  dimensions: { length: 180, width: 60 },
  composition: "90% Spandex, 10% Polyester",
  suitable_for: ["activewear", "athletic clothing"],
  care_instructions: "Machine washable, hang dry.",
  origin: "Taiwan",
  sustainability_rating: "None",
  texture: "Stretchy",
  fire_retardant: false,
  water_resistant: true,
  pattern: "Solid",
};

function ProductAddEditForm(props) {
  const { close, opened, formSubmitted, editItemId } = props;
  const { theme } = useStyles();
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    // validate: yupResolver(validationSupplierItem),
    initialValues: initialData,
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
                form.reset();
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
                form.reset();
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
            form.setValues({
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
      title="Fabric Details"
      position="right"
      padding="md"
      size="md"
      withCloseButton
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSupplierFormSubmit(values);
        })}
      >
        <Box style={{ height: "calc(100vh - 120px)" }}>
          <ScrollArea style={{ height: "100%" }} type="always">
            <Stack spacing="md" pr="sm">
              <TextInput
                label="Name"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <Textarea
                label="Description"
                autosize
                minRows={2}
                {...form.getInputProps("description")}
              />
              <Group grow>
                <TextInput
                  label="Category"
                  {...form.getInputProps("category")}
                />
                <TextInput label="Brand" {...form.getInputProps("brand")} />
              </Group>
              <Group grow>
                <TextInput label="Color" {...form.getInputProps("color")} />
                <TextInput label="Pattern" {...form.getInputProps("pattern")} />
              </Group>
              <Group grow>
                <NumberInput
                  label="Price"
                  precision={2}
                  min={0}
                  parser={(val) => val.replace(/\$/g, "")}
                  {...form.getInputProps("price")}
                />
                <TextInput label="Unit" {...form.getInputProps("unit")} />
              </Group>
              <Group grow>
                <NumberInput
                  label="Stock Quantity"
                  min={0}
                  {...form.getInputProps("stock_quantity")}
                />
                <NumberInput
                  label="Weight (kg)"
                  precision={2}
                  min={0}
                  step={0.01}
                  {...form.getInputProps("weight")}
                />
              </Group>
              <Group grow>
                <NumberInput
                  label="Length (cm)"
                  {...form.getInputProps("dimensions.length")}
                />
                <NumberInput
                  label="Width (cm)"
                  {...form.getInputProps("dimensions.width")}
                />
              </Group>
              <TextInput
                label="Composition"
                {...form.getInputProps("composition")}
              />
              <MultiSelect
                label="Suitable For"
                data={[
                  "activewear",
                  "athletic clothing",
                  "swimwear",
                  "casual wear",
                  "outerwear",
                ]}
                placeholder="Select suitable categories"
                {...form.getInputProps("suitable_for")}
              />
              <Textarea
                label="Care Instructions"
                autosize
                minRows={2}
                {...form.getInputProps("care_instructions")}
              />
              <TextInput label="Origin" {...form.getInputProps("origin")} />
              <Select
                label="Sustainability Rating"
                data={["None", "Low", "Moderate", "High"]}
                {...form.getInputProps("sustainability_rating")}
              />
              <TextInput label="Texture" {...form.getInputProps("texture")} />
              <Group>
                <Switch
                  label="Fire Retardant"
                  {...form.getInputProps("fire_retardant", {
                    type: "checkbox",
                  })}
                />
                <Switch
                  label="Water Resistant"
                  {...form.getInputProps("water_resistant", {
                    type: "checkbox",
                  })}
                />
              </Group>
              <Box h={80} /> {/* Spacer for sticky button */}
            </Stack>
          </ScrollArea>
        </Box>

        <Divider my="sm" />

        <Box
          pos="sticky"
          bottom={0}
          p="sm"
          bg="white"
          style={{
            borderTop: "1px solid #e9ecef",
            zIndex: 10,
          }}
        >
          <Button type="submit" fullWidth>
            Save Product
          </Button>
        </Box>
      </form>
    </Drawer>
  );
}

export default ProductAddEditForm;
