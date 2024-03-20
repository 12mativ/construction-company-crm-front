"use client";

import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";

import { useAppSelector } from "@/hooks/redux-hooks";
import { isAccountant, isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";

const Page = () => {
  const currentUser = useAppSelector(state => state.userReducer.user);

  if (!isAdmin(currentUser) && !isAccountant(currentUser)) {
    return notFound();
  }
  
  return (
    <div className="flex w-[340px] sm:w-[620px] flex-col gap-y-5 lg:w-full">
      <TotalBalance />

      <TransactionLog />
    </div>
  );
};

export default Page;
