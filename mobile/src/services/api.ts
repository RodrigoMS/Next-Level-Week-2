import axios from 'axios'

const api = axios.create({
    /* Trocar pelo IP acessível na rede. */
    baseURL: 'http://192.168.0.105:3333'
})

export default api