import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { ProjectType } from "./projects";

export enum ProjectStatusEnum {
  INPROCESS="INPROCESS",
  PLANNING="PLANNING"
}
interface ProjectItemProps {
  projectItemTitle: string;
  projectDate: string;
  projectStatus: ProjectStatusEnum;
}

const ProjectItem = ({
  name,
  startDate,
  endDate,
  workQuantity,
  workDoneQuantity
}: ProjectType) => {

  const isProjectPlanning = workDoneQuantity === 0;
  const progress = (workDoneQuantity * 100) / workQuantity;
  return (
    <div 
      className="flex flex-col justify-between w-[270px] h-[300px] shadow-md rounded-lg
      bg-white hover:cursor-pointer hover:shadow-xl transition"
      >
      <div className={cn(
        "flex flex-col gap-y-2 p-5",
        isProjectPlanning && 'h-full'
      )}>
        <p className="text-red-500 text-xl">{name}</p>
        <p className="text-zinc-400 text-sm flex-1">{startDate} - {endDate}</p>

        {isProjectPlanning && (
          <div className="flex items-center w-fit gap-x-2 bg-neutral-300 py-1 px-3 rounded-lg">
            <CalendarDays size={20} className='text-neutral-600' />
            <p className='text-neutral-600 text-sm font-semibold'>Планирование</p>
          </div>
        )}
      </div>

      {!isProjectPlanning && <Progress value={progress} />}
    </div>
  );
};

export default ProjectItem;
