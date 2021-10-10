import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://localhost:44393/v0',
    headers: {'Content-Type' : 'application/json'}
})

export default api;
