"use client";

import ProjectEstimate from "@/components/project/project-estimate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorksChart from "@/components/project/works-chart/works-chart";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  const { projects } = useAppSelector((state) => state.projectsReducer);
  const { projectId } = useParams<{ projectId: string }>();
  const currentProject = projects.find((project) => project.id === +projectId);
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-x-4 w-[220px] mb-6">
        <ChevronLeft
          onClick={() => router.push("/projects")}
          className="w-10 h-10 rounded-full hover:bg-neutral-300 cursor-pointer transition"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-xl font-semibold uppercase">
            {currentProject?.name}
          </p>
          <div className="bg-white p-2 rounded-lg shadow-lg text-center">
            {currentProject?.startDate} - {currentProject?.endDate}
          </div>
        </div>
      </div>
      <Tabs defaultValue="estimate">
        <TabsList className="grid w-[250px] grid-cols-2 bg-neutral-200">
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
          <WorksChart />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
