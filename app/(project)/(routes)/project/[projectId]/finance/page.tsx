"use client";

import ProjectOrdersJournal from "@/components/project/project-orders-journal";
import ProjectOrdersNeedToPay from "@/components/project/project-orders-need-to-pay";
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
    <>
      <Tabs defaultValue="needToPay">
        <TabsList className="grid w-[280px] grid-cols-2 bg-neutral-200">
          <TabsTrigger value="needToPay" className="hover:bg-neutral-300">
            Требует оплаты
          </TabsTrigger>
          <TabsTrigger value="ordersJournal" className="hover:bg-neutral-300 p-1">
            Журнал операций
          </TabsTrigger>
        </TabsList>
        <TabsContent value="needToPay">
          <ProjectOrdersNeedToPay />
        </TabsContent>
        <TabsContent value="ordersJournal">
          <ProjectOrdersJournal />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
