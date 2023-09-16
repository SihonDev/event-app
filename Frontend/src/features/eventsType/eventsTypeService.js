import axios from 'axios'
import Wedding from '../../assets/images/Wedding.jpg'
import BarMitzva from '../../assets/images/BarMitzva.jpg'
import Birthday from '../../assets/images/Birthday.jpg'
import Circumcision from '../../assets/images/Circumcision.jpg'
const API_URL = '/api/eventsType/'


// Get user eventsType
  const getEventsType = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  const response = await axios.get(API_URL, config)
 
  // const response = [
  //   { name: "חתונה", image: Wedding, description: "hello", link: "wedding" },
  //   { name: "בר מצווה", image: BarMitzva, description: "hello", link: "barMitzva" },
  //   { name: "יום הולדת", image: Birthday, description: "hello", link: "birthday" },
  //   { name: "ברית", image: Circumcision, description: "hello", link: "circumcision" },
  // ]
  return response.data
}

const eventsTypeService = {
  getEventsType,
}

export default eventsTypeService