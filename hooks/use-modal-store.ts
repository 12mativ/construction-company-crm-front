import { ResourcePatternType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { create } from "zustand";

export type ModalType =
  | "createProject"
  | "createResourcePattern"
  | "createCounterparty"
  | "createOrganisation"
  | "createMoneyAccount"
  | "createTransfer"
  | "createOutcome"
  | "createIncome";

interface ModalData {
  resourceType?: ResourcePatternType;
  organisationsNames?: string[]
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => {
  return {
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
  };
});
