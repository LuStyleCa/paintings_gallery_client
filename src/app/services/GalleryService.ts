import axios from "axios";
import { GalleryModel } from "../models/Gallery-model";

// services/galleryService.ts
const API_URL = "http://localhost:8080/api/v1/galleries"; // Replace with your backend URL

export const galleryService = {
  async createGallery(title: string, showTitle: boolean) {
    const response = await axios.post(`${API_URL}/create`, {
      title,
      showTitle,
    });
    return response.data;
  },

  async getAllGalleries() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async deleteGalleryById(galleryId: number) {
    await axios.delete(`${API_URL}/${galleryId}`);
  },

  async updateGallery(galleryData: GalleryModel) {
    const response = await axios.patch(`${API_URL}/${galleryData.id}`, {
      title: galleryData.title,
      showTitle: galleryData.showTitle,
    });
    return response.data;
  },
};
