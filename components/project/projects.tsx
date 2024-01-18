"use client";

import { PlusCircle } from "lucide-react";
import ProjectItem, { ProjectStatusEnum } from "./project-item";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { getProjects } from "@/http/projectsAPI";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addProjects } from "@/lib/features/projects/projectsSlice";

export interface ProjectType {
  name: string;
  startDate: null;
  endDate: null;
  workQuantity: number;
  workDoneQuantity: number;
}

const Projects = () => {
  // const projects = [
  //   {
  //     id: 1,
  //     projectItemTitle: "Демо-проект",
  //     projectDate: "9/10/22 - 2/11/23",
  //     projectStatus: ProjectStatusEnum.INPROCESS,
  //   },
  //   {
  //     id: 2,
  //     projectItemTitle: "Демо-проект 2",
  //     projectDate: "9/10/22 - 2/11/23",
  //     projectStatus: ProjectStatusEnum.INPROCESS,
  //   },
  //   {
  //     id: 3,
  //     projectItemTitle: "Демо-проект 3",
  //     projectDate: "9/10/22 - 2/11/23",
  //     projectStatus: ProjectStatusEnum.PLANNING,
  //   },
  //   {
  //     id: 4,
  //     projectItemTitle: "Демо-проект 4",
  //     projectDate: "9/10/22 - 2/11/23",
  //     projectStatus: ProjectStatusEnum.INPROCESS,
  //   },
  //   {
  //     id: 5,
  //     projectItemTitle: "Демо-проект 5",
  //     projectDate: "9/10/22 - 2/11/23",
  //     projectStatus: ProjectStatusEnum.PLANNING,
  //   },
  // ];

  // const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const projects = useAppSelector((state) => state.projectsReducer.projects);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsProjectsLoading(true);
    getProjects()
      .then((res) => dispatch(addProjects(res.data)))
      .finally(() => setIsProjectsLoading(false));
  }, []);

  const { onOpen } = useModal();

  if (isProjectsLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="flex gap-x-32 gap-y-10 flex-wrap">
      {projects.map((project) => {
        return <ProjectItem key={project.name} {...project} />;
      })}

      <div
        className="flex flex-col gap-y-2 group justify-center items-center w-[270px] h-[300px] shadow-md rounded-lg
      bg-neutral-300 hover:cursor-pointer transition mb-5"
        onClick={() => {
          onOpen("createProject")
        }}
      >
        <PlusCircle
          className="text-neutral-600 group-hover:scale-110 transition"
          size={50}
        />
        <p className="text-neutral-600 font-semibold">Добавить проект</p>
      </div>
    </div>
  );
};

export default Projects;
