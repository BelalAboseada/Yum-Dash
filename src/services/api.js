import axios from "axios";
// Api url
const ApiUrl = "http://127.0.0.1:8000";

// Fetch All Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/items/?format=json`);
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// Fetch one Product
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${ApiUrl}/items/${id}/?format=json`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching product with ID ${id}:`, err);
    throw err;
  }
};
