import ProjectEstimate from "@/components/project/project-estimate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <>
      <Tabs defaultValue="estimate">
        <TabsList className="grid w-[30%] grid-cols-2 bg-neutral-200 ">
          <TabsTrigger value="estimate" className="hover:bg-neutral-300">
            Смета
          </TabsTrigger>
          <TabsTrigger value="workChart" className="hover:bg-neutral-300">
            График работ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="estimate">
          <ProjectEstimate />
        </TabsContent>
        <TabsContent value="workChart">
          <div>График</div>
        </TabsContent>
      </Tabs>  
      
    </>
  );
};

export default Page;
