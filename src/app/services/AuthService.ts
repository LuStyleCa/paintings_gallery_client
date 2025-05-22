import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8080/api/v1/auth";

export const AuthService = {
    async login(email: string, password: string) {
        const response = await axios.post(`${API_URL}/login`, { email, password })
        if(response) {
          Cookies.set('accessToken', response.data.accessToken, {expires: 1})
        }
        return response.data;
      },
      async register(email: string, password: string, username: string) {
        const response = await axios.post(`${API_URL}/register`, { email, password, username })
        return response.data;
      },
}