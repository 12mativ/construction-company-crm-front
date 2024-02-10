import { $authHost } from "..";

interface ICreateWorksProgressProps {
  quantityBefore: number;
  quantityAfter: number;
  timestamp: string;
  workId: number;
}

export const getWorksProgress = async (projectId: string) => {
  const response = await $authHost.get(`/api/v1/progressOfWork/${projectId}`);

  return response;
};

export const updateWorkProgress = async ({
  quantityBefore,
  quantityAfter,
  timestamp,
  workId,
}: ICreateWorksProgressProps) => {
  const response = await $authHost.post("/api/v1/progressOfWork", {
    quantityBefore,
    quantityAfter,
    timestamp,
    workId,
  });

  return response;
};
