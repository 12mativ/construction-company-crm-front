"use client";

import Counterparties from "@/components/counterparty/counterparties";
import ResourcePatterns from "@/components/resource-patterns/resource-patterns";

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
    <div  className="w-[340px] sm:w-[620px] lg:w-full">
      <Tabs defaultValue="resourcePatterns">
        <TabsList className="grid w-full grid-cols-2 h-16 bg-neutral-200">
          <TabsTrigger value="resourcePatterns" className="py-3 hover:bg-neutral-300">
            Расценки
          </TabsTrigger>
          <TabsTrigger value="counterparties" className="py-3 hover:bg-neutral-300">
            Контрагенты
          </TabsTrigger>
        </TabsList>
        <TabsContent value="resourcePatterns">
          <ResourcePatterns />
        </TabsContent>
        <TabsContent value="counterparties">
          <Counterparties />
        </TabsContent>
      </Tabs>
    </div>
    
  );
};

export default Page;
