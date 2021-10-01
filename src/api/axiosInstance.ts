import axios from 'axios'

export const baseUrl:string = 'https://young-beyond-74584.herokuapp.com'

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}/api`,
  headers: {
    "Content-type": "application/json"
  }

})

export default axiosInstance