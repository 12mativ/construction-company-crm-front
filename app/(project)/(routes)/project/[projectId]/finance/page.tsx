import ProjectEstimate from "@/components/project/project-estimate";
import ProjectOrdersJournal from "@/components/project/project-orders-journal";
import ProjectOrdersNeedToPay from "@/components/project/project-orders-need-to-pay";
import WorksChart from "@/components/project/works-chart/works-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
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
