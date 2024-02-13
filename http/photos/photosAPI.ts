import { $authHost } from "..";

interface getPhotosProps {
  data: FormData
}

export const createPhoto = async (formData: FormData) => {
  const response = await $authHost.post("/api/v1/photos", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response;
};