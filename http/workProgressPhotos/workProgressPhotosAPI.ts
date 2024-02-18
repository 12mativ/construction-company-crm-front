import { $authHost } from "..";

export const deleteWorkProgressPhoto = async (imageId: string) => {
  await $authHost.delete(`/api/v1/photos/${imageId}`);
};
