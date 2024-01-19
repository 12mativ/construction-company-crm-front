import ResourcePatterns from "@/components/resource-patterns/resource-patterns";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Catalog = () => {
  return (
    <Tabs defaultValue="resourcePatterns">
      <TabsList className="grid w-full grid-cols-2 h-16 bg-neutral-200">
        <TabsTrigger value="resourcePatterns" className="py-3">Расценки</TabsTrigger>
        <TabsTrigger value="counterparties" className="py-3">Контрагенты</TabsTrigger>
      </TabsList>
      <TabsContent value="resourcePatterns">
        <ResourcePatterns />
      </TabsContent>
      <TabsContent value="counterparties">
        <div>
          Контрагенты
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Catalog;
