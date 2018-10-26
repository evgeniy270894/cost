import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:9003/',
    headers: {'Content-type': 'application/json'}
  })
}
