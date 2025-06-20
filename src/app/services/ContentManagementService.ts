import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/v1/content_management`; // Replace with your backend URL

export const contentManagementService = {
  async getContentManagement() {
    const response = await axios.get(`${API_URL}`)
    return response.data;
  },
};
