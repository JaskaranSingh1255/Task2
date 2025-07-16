import axios from 'axios';

const API_BASE_URL = 'https://real-time-product-search.p.rapidapi.com/search?q=Nike%20shoes&country=uk&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY'; // Replace with your actual API URL

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};