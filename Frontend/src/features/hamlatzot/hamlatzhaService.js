import axios from 'axios'

const API_URL = '/api/hamlatzot/'


const createHamlatzha = async (hamlatzhaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL, hamlatzhaData, config)

  return response.data
}


const getHamlatzot = async () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  const response = await axios.get(API_URL)

  return response.data
}


const deleteHamlatzha = async (hamlatzhaId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + hamlatzhaId, config)

  return response.data
}

const hamlatzhaService = {
  createHamlatzha,
  getHamlatzot,
  deleteHamlatzha,
}

export default hamlatzhaService
