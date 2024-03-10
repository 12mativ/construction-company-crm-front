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
import { deleteCounterparty } from "@/http/counterparties/counterpartiesAPI";
import { removeCounterparty } from "@/lib/features/counterparties/counterpartiesSlice";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

export const DeleteCounterpartyModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "deleteCounterparty";
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await deleteCounterparty(data.partnerId!);
      dispatch(removeCounterparty({partnerId: data.partnerId!}))
      onClose()
    } catch(error: AxiosError | any) {
      setError("Произошла ошибка при удалении контрагента.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Удалить партнера
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Вы уверены, что хотите сделать это? <br />
            Партнер <span className="text-red-500">{data?.counterpartyName}</span> будет удален без возможности восстановления.
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
