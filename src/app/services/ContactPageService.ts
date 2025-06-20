import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/v1/contact_page`; // Replace with your backend URL

export const contactPageService = {
    async saveContactPage(email: string, phoneNumber: string, location: string) {
      const response = await axios.put(
        `${API_URL}`,
        { email, phoneNumber, location }
      );
  
      return response.data;
    },
  };