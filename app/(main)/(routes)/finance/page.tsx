"use client";

import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";
import { useAppSelector } from "@/hooks/redux-hooks";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NeedPayment from "@/components/finance/need-payment";

const Page = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-y-5">
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
