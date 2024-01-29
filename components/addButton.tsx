"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ModalData, ModalType, useModal } from "@/hooks/use-modal-store";

interface AddButtonProps {
  buttonText: string;
  modalName: ModalType;
  data?: ModalData
}

const AddButton = ({ buttonText, modalName, data }: AddButtonProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center" onClick={() => onOpen(modalName, data)}>
      <Button variant="ghost" className="flex items-center group gap-x-2 p-6">
        <p>{buttonText}</p>
        <Plus
          className="bg-neutral-300 text-base text-neutral-500 group-hover:bg-red-600
            group-hover:text-neutral-100 rounded-full p-1 transition"
          size={30}
        />
      </Button>
    </div>
  );
};

export default AddButton;
