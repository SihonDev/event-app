import axios from 'axios';

const API_URL = '/api/suppliers/'

// Get user suppliers
  const getSuppliers = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL, config)
  return response.data
}


const supplierService = {
  getSuppliers,
}

export default supplierService