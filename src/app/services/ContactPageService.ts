import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/contact_page"; // Replace with your backend URL

export const contactPageService = {
    async saveContactPage(email: string, phoneNumber: string, location: string) {
      const response = await axios.put(
        `${API_URL}`,
        { email, phoneNumber, location }
      );
  
      return response.data;
    },
  };