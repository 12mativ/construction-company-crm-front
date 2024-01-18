'use client'

import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";
import { useAppSelector } from "@/hooks/redux-hooks";
import { redirect } from "next/navigation";

const Page = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='flex flex-col gap-y-5'>
      <TotalBalance />
      <TransactionLog />
    </div>
  )
}

export default Page;