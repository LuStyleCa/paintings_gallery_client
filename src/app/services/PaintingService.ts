import axios from "axios";
import { PaintingModel } from "../models/Painting-model";

const API_URL = "http://localhost:8080/api/v1/paintings"; // Replace with your backend URL

export const PaintingService = {
  async getPaintingById(paintingId: number): Promise<PaintingModel> {
    const response = await axios.get(`${API_URL}/${paintingId}`);
    return response.data;
  },
  async uploadPainting(
    galleryId: number,
    title: string,
    description: string,
    price: string,
    file: File
  ) {
    const formData = new FormData();
    formData.append("file", file); // The image file
    formData.append(
      "paintingDto",
      JSON.stringify({ title, description, price })
    ); // JSON as string

    const response = await axios.post(
      `${API_URL}/upload/${galleryId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
  async deletePainting(galleryId: number, paintingId: number) {
    await axios.delete(`${API_URL}/${galleryId}/${paintingId}`);
  },
  async updatePainting(
    galleryId: number,
    paintingId: number,
    title: string,
    description: string,
    price: string,
    file: File
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "paintingDto",
      JSON.stringify({ title, description, price })
    );
    const response = await axios.patch(
      `${API_URL}/${galleryId}/${paintingId}`,
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
