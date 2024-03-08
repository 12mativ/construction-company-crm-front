"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getProjects } from "@/http/projects/projectsAPI";
import { addProjects } from "@/lib/features/projects/projectsSlice";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectItem from "./project-item";

const Projects = () => {
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
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col gap-x-20 gap-y-10 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-normal lg:flex-row lg:flex-wrap">
      {projects.map((project) => {
        return <ProjectItem key={project.id} {...project} />;
      })}

      <div
        className="flex flex-col gap-y-3 group justify-center items-center w-[270px] h-[300px] shadow-md rounded-lg
          bg-neutral-300 hover:cursor-pointer transition mb-5"
        onClick={() => {
          onOpen("createProject");
        }}
      >
        <PlusCircle
          className="text-neutral-500 stroke-1 group-hover:scale-110 transition group-hover:text-red-600"
          size={60}
        />
        <p className="text-neutral-500 font-medium uppercase">Добавить проект</p>
      </div>
    </div>
  );
};

export default Projects;
