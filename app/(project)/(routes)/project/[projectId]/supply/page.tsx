import ProjectEstimate from "@/components/project/project-estimate";
import ProjectQueries from "@/components/project/project-queries";
import WorksChart from "@/components/project/works-chart/works-chart";
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
          <div>Раздел находится в разработке...</div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
