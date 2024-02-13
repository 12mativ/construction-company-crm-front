"use client";

import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useParams, useRouter } from "next/navigation";
import ProjectMenu from "@/components/project-menu/project-menu";
import { formateComplexDate } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projects } = useAppSelector((state) => state.projectsReducer);
  const { projectId } = useParams<{ projectId: string }>();
  const currentProject = projects.find((project) => project.id === +projectId);
  const router = useRouter();

  return (
    <div className="pb-5">
      <Header />
      <div className="px-20 pt-32 flex">
        <div className="flex items-center gap-x-4 w-[295px] mb-6">
          <ChevronLeft
            onClick={() => router.push("/projects")}
            className="w-10 h-10 rounded-full hover:bg-neutral-300 cursor-pointer transition"
          />
          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-semibold uppercase">
              {currentProject?.name}
            </p>

            <div className="bg-white text-neutral-500 p-2 rounded-lg shadow-lg text-center">
              {currentProject!.startDate && currentProject!.endDate
                ? `${formateComplexDate(currentProject!.startDate)} -
                ${formateComplexDate(currentProject!.endDate)}`
                : "-"}
            </div>
          </div>
        </div>
        <ProjectMenu />
      </div>
      <div className="bg-neutral-100 px-20">
        <main>{children}</main>
      </div>
    </div>
  );
}
