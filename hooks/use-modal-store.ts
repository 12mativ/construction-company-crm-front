import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { PartnerType } from "@/lib/features/counterparties/counterpartiesSlice";
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
  | "updateWorkProgress"
  | "deleteWorkProgressPhoto"
  | "deleteOrganisation"
  | "editOrganisation"
  | "deleteMoneyAccount"
  | "updateMoneyAccount"
  | "removeCounterparty"
  | "editCounterparty"
  | "addUserToProject"
  | "editMoneyAccount"
  | "deleteCounterparty"
  | "editCounterparty"
  | "deleteResource"
  | "editResource"
  | "deleteWorksGroup"
  | "editWorksGroup";

export interface ModalData {
  organisationsNames?: string[];
  organisationName?: string;
  organisationId?: number;
  moneyAccountId?: number;
  moneyAccountName?: string;
  balance?: number;
  numberOfAccount?: string;
  projectId?: string;
  workGroups?: IWorkGroup[];
  worksGroupId?: number;
  work?: IWorkEntity;
  imageId?: string;
  partnerId?: number;
  counterpartyName?: string;
  phoneNumber?: string;
  email?: string;
  partnerType?: PartnerType;
  resourcePatternId?: number;
  resourcePatternName?: string;
  costPricePerUnit?: number;
  orderPricePerUnit?: number;
  extraCharge?: number;
  measureUnit?: string;
  resourceType?: ResourceType;
  works_group_id?: number;
  worksGroupName?: string;
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
