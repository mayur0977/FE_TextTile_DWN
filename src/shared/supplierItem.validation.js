import * as Yup from "yup";

const nameRegex = /^[a-zA-Z\s]*$/;

export const validationSupplierItem = Yup.object({
  itemName: Yup.string()
    .required("Item name is required.")
    .matches(nameRegex, "Please enter a valid Item name."),
  description: Yup.string()
    .required("Description is required.")
    .matches(nameRegex, "Please enter a valid description."),

  materialType: Yup.string().required("Material type selection is required."),
  quantityInMeters: Yup.number().required("Material quantity is required."),
  price: Yup.number().required("Price per meter is required."),
});
