"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { deleteWorkProgressPhoto } from "@/http/workProgressPhotos/workProgressPhotosAPI";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { removeWorkProgressPhoto } from "@/lib/features/works-progress/worksProgressSlice";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

export const DeleteWorksProgressPhotoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "deleteWorkProgressPhoto";
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await deleteWorkProgressPhoto(data.imageId!);
      dispatch(removeWorkProgressPhoto({imageId: data.imageId!}))
      onClose()
    } catch(error: AxiosError | any) {
      setError("Произошла ошибка при удалении фото.");
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Удалить фото
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Вы уверены, что хотите сделать это? <br />
            Фото будет удалено без возможности восстановления.
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={() => {
                onClose();
              }}
              variant="ghost"
            >
              Назад
            </Button>

            <Button
              disabled={isLoading}
              onClick={onClick}
              className="bg-red-500 hover:bg-red-400"
            >
              Подтвердить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
