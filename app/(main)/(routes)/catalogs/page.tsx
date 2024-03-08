import Counterparties from "@/components/counterparty/counterparties";
import ResourcePatterns from "@/components/resource-patterns/resource-patterns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div  className="w-[400px] sm:w-[493px] lg:w-full">
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
