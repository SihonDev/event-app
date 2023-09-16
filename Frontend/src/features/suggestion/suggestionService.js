import axios from 'axios';

const API_URL = '/api/suggestions/'

// Get user suppliers
const getSuggestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  const suggestionType = window.location.toString().split('/').at(-1)
  if (suggestionType === "ulam") {
    return response.data[0].ulam
  } else if (suggestionType === "food") {
    return response.data[0].food
  } else if (suggestionType === "salon") {
    return response.data[0].salon
  } else if (suggestionType === "attraction") {
    return response.data[0].attraction
  } else if (suggestionType === "clouth") {
    return response.data[0].clouth
  } else if (suggestionType === "photographer") {
    return response.data[0].photographer
  } else if (suggestionType === "placeDesign") {
    return response.data[0].placeDesign
  } else if (suggestionType === "mohel") {
    return response.data[0].mohel
  } else if (suggestionType === "activeBar") {
    return response.data[0].activeBar
  }else {
    return response.data[0]
  }

}

const suggestionsService = {
  getSuggestions,
}

export default suggestionsService