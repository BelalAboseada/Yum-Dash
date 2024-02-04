import axios from "axios";
// Api url
const ApiUrl = "https://fakestoreapi.com";

// Fetch All Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/products`);
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
// Fetch one Product
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${ApiUrl}/products/${productId}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching product with ID ${productId}:`, err);
    throw err;
  }
};
