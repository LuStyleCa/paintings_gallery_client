import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/v1/content_management`; // Replace with your backend URL

export const homepageService = {
    async uploadHomepagePainting(file: File) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${API_URL}/homepage/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      return response.data;
    },
  };