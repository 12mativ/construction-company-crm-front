import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import {
  IWorkEntity,
  IWorkGroup,
} from "@/lib/features/works-groups/worksGroupsSlice";
import { create } from "zustand";

export type ModalType =
  | "createProject"
  | "createResourcePattern"
  | "createCounterparty"
  | "createOrganisation"
  | "createMoneyAccount"
  | "createTransfer"
  | "createOutcome"
  | "createIncome"
  | "createWorkGroup"
  | "createWork"
  | "addResource"
  | "updateWorkProgress";

export interface ModalData {
  resourceType?: ResourceType;
  organisationsNames?: string[];
  projectId?: string;
  workGroups?: IWorkGroup[];
  worksGroupId?: number;
  work?: IWorkEntity;
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
