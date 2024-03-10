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
import { deleteMoneyAccount } from "@/http/organisations/organisationsAPI";
import { removeMoneyAccount } from "@/lib/features/organisations/organisationsSlice";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

export const DeleteMoneyAccountModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "deleteMoneyAccount";
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await deleteMoneyAccount(data.moneyAccountId!);
      dispatch(removeMoneyAccount({moneyAccountId: data.moneyAccountId!}))
      onClose()
    } catch(error: AxiosError | any) {
      setError("Произошла ошибка при удалении счета.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Удалить счет
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Вы уверены, что хотите сделать это? <br />
            Счет <span className="text-red-500">{data?.moneyAccountName}</span> будет удален без возможности восстановления.
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
