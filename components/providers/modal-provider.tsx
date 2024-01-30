'use client'

import {useEffect, useState} from "react";
import { CreateProjectModal } from "../modals/create-project-modal";
import { CreateResourcePatternModal } from "../modals/create-resource-pattern-modal";
import { CreateCounterpartyModal } from "../modals/create-counterparty-modal";
import { CreateOrganisationModal } from "../modals/create-organisation-modal copy";
import { CreateMoneyAccountModal } from "../modals/create-money-account-modal";
import { CreateTransferModal } from "../modals/create-transfer-modal";
import { CreateOutcomeModal } from "../modals/create-outcome-modal";
import { CreateIncomeModal } from "../modals/create-income-modal";
import { CreateWorkGroupModal } from "../modals/create-works-group-modal";
import { CreateWorkModal } from "../modals/create-work-modal";
import { AddResourceModal } from "../modals/add-resource-modal";

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
    </>
  )
}