'use client'

import {useEffect, useState} from "react";
import { CreateProjectModal } from "../modals/create-project-modal";
import { CreateResourcePatternModal } from "../modals/create-resource-pattern-modal";
import { CreateCounterpartyModal } from "../modals/create-counterparty-modal";
import { CreateOrganisationModal } from "../modals/create-organisation-modal";
import { CreateMoneyAccountModal } from "../modals/create-money-account-modal";
import { CreateTransferModal } from "../modals/create-transfer-modal";
import { CreateOutcomeModal } from "../modals/create-outcome-modal";
import { CreateIncomeModal } from "../modals/create-income-modal";
import { CreateWorkGroupModal } from "../modals/create-works-group-modal";
import { CreateWorkModal } from "../modals/create-work-modal";
import { AddResourceModal } from "../modals/add-resource-modal";
import { UpdateWorkProgressModal } from "../modals/update-work-progress";
import { DeleteWorksProgressPhotoModal } from "../modals/delete-work-progress-image";
import { DeleteOrganisationModal } from "../modals/delete-organisation";
import { EditOrganisationModal } from "../modals/edit-organisation-modal";
import { DeleteMoneyAccountModal } from "../modals/delete-money-account-modal";
import { EditMoneyAccountModal } from "../modals/edit-money-account-modal";
import { AddUserToProjectModal } from "../modals/add-user-to-project-modal";
import { DeleteCounterpartyModal } from "../modals/delete-counterparty-modal";
import { EditCounterpartyModal } from "../modals/edit-counterparty-modal";
import { DeleteResourcesModal } from "../modals/delete-resource-modal";
import { EditResourceModal } from "../modals/edit-resource-modal";
import { DeleteWorksGroupsModal } from "../modals/delete-works-groups-modal";
import { EditWorkGroupModal } from "../modals/edit-works-group-modal";
export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateProjectModal />
      <CreateResourcePatternModal />
      <CreateCounterpartyModal />
      <CreateOrganisationModal />
      <CreateMoneyAccountModal />
      <CreateTransferModal />
      <CreateOutcomeModal />
      <CreateIncomeModal />
      <CreateWorkGroupModal />
      <CreateWorkModal />
      <AddResourceModal />
      <UpdateWorkProgressModal />
      <DeleteWorksProgressPhotoModal />
      <DeleteOrganisationModal />
      <EditOrganisationModal />
      <DeleteMoneyAccountModal />
      <EditMoneyAccountModal />
      <AddUserToProjectModal />
      <DeleteCounterpartyModal />
      <EditCounterpartyModal />
      <DeleteResourcesModal />
      <EditResourceModal />
      <DeleteWorksGroupsModal />
      <EditWorkGroupModal />
    </>
  )
}