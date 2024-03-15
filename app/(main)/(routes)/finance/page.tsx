"use client";

import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";

import NeedPayment from "@/components/finance/need-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      <Tabs defaultValue="transactionLog">
        <TabsList className="grid w-full grid-cols-2 h-16 bg-neutral-200 ">
          <TabsTrigger value="transactionLog" className="py-3 hover:bg-neutral-300">
            Журнал операций
          </TabsTrigger>
          <TabsTrigger value="needPayment" className="py-3 hover:bg-neutral-300">
            Требует оплаты
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactionLog">
          <TransactionLog />
        </TabsContent>
        <TabsContent value="needPayment">
          <NeedPayment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
