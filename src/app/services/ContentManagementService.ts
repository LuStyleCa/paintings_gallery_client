import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/content_management"; // Replace with your backend URL

export const contentManagementService = {
  async getContentManagement() {
    const response = await axios.get(`${API_URL}`)
    return response.data;
  },
};
