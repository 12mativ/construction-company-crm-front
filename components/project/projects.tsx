import { PlusCircle } from "lucide-react";
import ProjectItem, { ProjectStatusEnum } from "./project-item";

const Projects = () => {
  const projects = [
    {
      id: 1,
      projectItemTitle: 'Демо-проект',
      projectDate: '9/10/22 - 2/11/23',
      projectStatus: ProjectStatusEnum.INPROCESS
    },
    {
      id: 2,
      projectItemTitle: 'Демо-проект 2',
      projectDate: '9/10/22 - 2/11/23',
      projectStatus: ProjectStatusEnum.INPROCESS
    },
    {
      id: 3,
      projectItemTitle: 'Демо-проект 3',
      projectDate: '9/10/22 - 2/11/23',
      projectStatus: ProjectStatusEnum.PLANNING
    },
    {
      id: 4,
      projectItemTitle: 'Демо-проект 4',
      projectDate: '9/10/22 - 2/11/23',
      projectStatus: ProjectStatusEnum.INPROCESS
    },
    {
      id: 5,
      projectItemTitle: 'Демо-проект 5',
      projectDate: '9/10/22 - 2/11/23',
      projectStatus: ProjectStatusEnum.PLANNING
    },
  ]
  
  return (
    <div className='flex gap-x-32 gap-y-10 flex-wrap'>
      {
        projects.map((project) => {
          return <ProjectItem key={project.id} {...project} />
        })
      }

      <div className='flex flex-col gap-y-2 group justify-center items-center w-[270px] h-[300px] shadow-md rounded-lg
      bg-neutral-300 hover:cursor-pointer transition mb-5'>
        <PlusCircle className='text-neutral-600 group-hover:scale-110 transition' size={50} />
        <p className='text-neutral-600 font-semibold'>Добавить проект</p>
      </div>
    </div>
  )
}

export default Projects;