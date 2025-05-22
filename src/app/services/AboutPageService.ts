import axios from "axios";

const API_URL = "http://localhost:8080/api/v1"; // Replace with your backend URL

export const aboutPageService = {
    async saveAboutPage(text: string, file: File | null) {
      const formData = new FormData();
      if(file) {
        formData.append("file", file);
      }
      formData.append("aboutPageData", text );
      const response = await axios.put(
        `${API_URL}/about_page`,
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