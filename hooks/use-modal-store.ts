import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { PartnerType } from "@/lib/features/counterparties/counterpartiesSlice";
import {
  IResourceEntity,
  IWorkEntity,
  IWorkGroup,
} from "@/lib/features/works-groups/worksGroupsSlice";
import { create } from "zustand";
import { IOrder } from "@/lib/features/orders/ordersSlice";

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
  | "deleteResourcePattern"
  | "editResourcePattern"
  | "deleteWorksGroup"
  | "editWorksGroup"
  | "deleteWork"
  | "editWork"
  | "createOrder"
  | "createOrderPayment"
  | "editResource"
  | "deleteResource";

interface IWorksGroupForModal {
  worksGroupId: number;
  worksGroupName: string;
  worksGroupNumber: number;
}

interface IResourcePatternForModal {
  resourcePatternId: number
  resourcePatternName: string;
  resourcePatternCostPricePerUnit: number;
  resourcePatternOrderPricePerUnit: number;
  resourcePatternMeasureUnit: string;
}

interface IOrderForModal {
  id: number;
  name: string;
  factQuantity: number;
  factCostPerUnit: number;
}

export interface ModalData {
  organisationsNames?: string[];
  organisationName?: string;
  organisationId?: number;
  worksGroup?: IWorksGroupForModal;
  resourcePattern?: IResourcePatternForModal;
  moneyAccountId?: number;
  moneyAccountName?: string;
  balance?: number;
  numberOfAccount?: string;
  projectId?: string;
  workGroups?: IWorkGroup[];
  work?: IWorkEntity;
  imageId?: string;
  partnerId?: number;
  counterpartyName?: string;
  phoneNumber?: string;
  email?: string;
  partnerType?: PartnerType;
  resourceType?: ResourceType;
  worksGroupId?: number;
  orders?: IOrderForModal[];
  order?: IOrder;
  resource?: IResourceEntity;
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
