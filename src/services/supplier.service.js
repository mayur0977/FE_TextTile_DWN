import axios from "axios";

const addMaterialItem = (values) => {
  return axios.post("http://127.0.0.1:3001/api/v1/materialItems", values);
};
const updateMaterialItem = (values, itemId) => {
  return axios.patch(
    `http://127.0.0.1:3001/api/v1/materialItems/${itemId}`,
    values
  );
};
const getAllMaterialItems = () => {
  return axios.get("http://127.0.0.1:3001/api/v1/materialItems");
};
const getAllMaterialItemsBySupplierId = (supplierId) => {
  return axios.get(
    `http://127.0.0.1:3001/api/v1/materialItems/supplier/${supplierId}`
  );
};

const getMaterialItemByID = (itemId) => {
  return axios.get(`http://127.0.0.1:3001/api/v1/materialItems/${itemId}`);
};
const deleteMaterialItem = (itemId) => {
  return axios.delete(`http://127.0.0.1:3001/api/v1/materialItems/${itemId}`);
};

const supplierService = {
  addMaterialItem,
  updateMaterialItem,
  getAllMaterialItems,
  getAllMaterialItemsBySupplierId,
  getMaterialItemByID,
  deleteMaterialItem,
};

export default supplierService;
