import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;

export const getSectors = () =>
  apiClient.get("/sectors").then((res) => res.data);

export interface Program {
  _id: string;
  name: string;
  developer: string;
  description: string;
  sectors: Array<{ _id: string; name: string }>;
  imageUrl: string;
  websiteUrl?: string; // Optional property
  parkillGuidesUrl?: string; // Optional property
  topUsers?: string; // Optional property
  downloadLink?: string; // Optional property
  status: "Active" | "Inactive" | "Archived";
}

export const getPrograms = (sectorId?: string) => {
  const params = sectorId ? { sector: sectorId } : {};
  return apiClient
    .get<Program[]>("/programs", { params })
    .then((res) => res.data);
};
