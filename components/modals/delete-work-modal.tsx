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
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { deleteWork } from "@/http/works-groups/worksAPI";
import { removeWork } from "@/lib/features/works-groups/worksGroupsSlice";

export const DeleteWorkModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteWork";
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await deleteWork(data.work_id!);
      dispatch(removeWork({work_id: data.work_id!}))
      onClose()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Удалить работу
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Вы уверены, что хотите сделать это? <br />
            Работа <span className="text-red-500">{data?.workName}</span> будет удалена без возможности восстановления.
          </DialogDescription>
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
