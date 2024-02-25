import { Progress } from "@/components/ui/progress";
import { ProjectStatusType } from "@/lib/features/projects/projectsSlice";
import { cn, formateComplexDate } from "@/lib/utils";
import { CalendarDays, CheckSquare2, Play } from "lucide-react";
import Link from "next/link";

interface ProjectItemProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  totalWorkQuantity: number;
  doneWorkQuantity: number;
  projectStatus: ProjectStatusType;
}

const ProjectItem = ({
  id,
  name,
  startDate,
  endDate,
  totalWorkQuantity,
  doneWorkQuantity,
  projectStatus,
}: ProjectItemProps) => {
  const isProjectPlanning = projectStatus === "PLANNING";
  const isProjectInWork = projectStatus === "INWORK";
  const isProjectCompleted = projectStatus === "COMPLETED";

  const progress = (doneWorkQuantity * 100) / totalWorkQuantity;
  return (
    <Link
      href={`/project/${id}/planning`}
      className="flex flex-col justify-between w-[270px] h-[300px] shadow-md rounded-lg
      bg-white hover:cursor-pointer hover:shadow-lg transition hover:text-red-600"
    >
      <div
        className={cn(
          "flex flex-col gap-y-2 p-6",
          (isProjectPlanning || isProjectCompleted) && "h-full"
        )}
      >
        <p className="text-black-600 text-xl">{name}</p>
        <p className="text-zinc-400 text-sm flex-1">
          {startDate && endDate
            ? `${formateComplexDate(startDate)} - ${formateComplexDate(
                endDate
              )}`
            : "-"}
        </p>

        {isProjectPlanning && (
          <div className="flex items-center w-fit gap-x-2 bg-neutral-300 py-1 px-3 rounded-lg">
            <CalendarDays size={20} className="text-neutral-600" />
            <p className="text-neutral-600 text-sm font-semibold">
              Планирование
            </p>
          </div>
        )}

        {isProjectCompleted && (
          <div className="flex items-center w-fit gap-x-2 bg-emerald-200 py-1 px-3 rounded-lg">
            <CheckSquare2 size={20} className="text-emerald-700" />
            <p className="text-emerald-700 text-sm font-semibold">Завершен</p>
          </div>
        )}
      </div>

      {isProjectInWork && (
        <div className="flex flex-col gap-y-2 justify-center">
          <div className="flex items-center gap-x-2 bg-neutral-300 rounded-lg w-fit py-1 px-3 ml-6">
            <Play size={20} className="text-neutral-600" />
            <p className="text-neutral-600 text-sm font-semibold">В работе</p>
          </div>

          <Progress value={progress} />
        </div>
      )}
    </Link>
  );
};

export default ProjectItem;
