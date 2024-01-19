'use client'

import {useEffect, useState} from "react";
import { CreateProjectModal } from "../modals/create-project-modal";
import { CreateResourcePatternModal } from "../modals/create-resource-pattern-modal";

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
    </>
  )
}