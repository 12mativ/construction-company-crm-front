import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";

import NeedPayment from "@/components/finance/need-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="flex w-[400px] sm:w-full flex-col gap-y-5 lg:w-full">
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
