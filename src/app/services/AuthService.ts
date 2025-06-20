import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_API_URL = `${API_BASE_URL}/api/v1/auth`;
const FORGOT_PASSWORD_URL = `${API_BASE_URL}/forgotPassword`;

export const AuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      email,
      password,
    });
    if (response) {
      Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
    }
    return response.data;
  },
  async register(email: string, password: string, username: string) {
    const response = await axios.post(`${AUTH_API_URL}/register`, {
      email,
      password,
      username,
    });
    return response.data;
  },
  async verifyEmail(email: string) {
    const response = await axios.post(
      `${FORGOT_PASSWORD_URL}/verifyEmail`,
      { email }
    );
    return response.data;
  },
    async verifyOtp(otpString: string, email: string) {
      const otp = parseInt(otpString, 10);
      const response = await axios.post(`${FORGOT_PASSWORD_URL}/verifyOtp`, {
        otp,
        email,
      });
      return response.data;
    },
  async changePassword(
    password: string,
    confirmPassword: string,
    email: string
  ) {
    const response = await axios.post(`${FORGOT_PASSWORD_URL}/changePassword`, {
      password,
      confirmPassword,
      email,
    });
    return response.data;
  },
};
