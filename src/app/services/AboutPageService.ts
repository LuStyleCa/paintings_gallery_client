import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/v1`;

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