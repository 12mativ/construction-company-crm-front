import ProjectOrders from "@/components/project/project-orders";
import ProjectQueries from "@/components/project/project-queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <>
      <Tabs defaultValue="queries">
        <TabsList className="grid w-[250px] grid-cols-2 bg-neutral-200">
          <TabsTrigger value="queries" className="hover:bg-neutral-300">
            Заявки
          </TabsTrigger>
          <TabsTrigger value="orders" className="hover:bg-neutral-300">
            Заказы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queries">
          <ProjectQueries />
        </TabsContent>
        <TabsContent value="orders">
          <ProjectOrders />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
