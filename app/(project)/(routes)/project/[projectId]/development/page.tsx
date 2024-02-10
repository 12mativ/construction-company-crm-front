import Works from "@/components/development/works";
import WorksJournal from "@/components/development/works-journal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <>
      <Tabs defaultValue="works">
        <TabsList className="grid w-[250px] grid-cols-2 bg-neutral-200">
          <TabsTrigger value="works" className="hover:bg-neutral-300">
            Работы
          </TabsTrigger>
          <TabsTrigger value="worksJournal" className="hover:bg-neutral-300">
            Журнал работ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="works">
          <Works />
        </TabsContent>
        <TabsContent value="worksJournal">
          <WorksJournal />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
