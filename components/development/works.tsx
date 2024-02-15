"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { cn, formateComplexDate } from "@/lib/utils";
import { CheckSquare2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Works = () => {
  const [isLoading, setIsLoading] = useState(false);
  const worksGroups = useAppSelector(
    (state) => state.worksGroupsReducer.worksGroups
  );
  const { onOpen } = useModal();

  const sortedWorkGroups = worksGroups.map((workGroup) => {
    const sortedWorkEntityList = workGroup.workEntityList
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);

        return dateA.getTime() - dateB.getTime();
      })
      .sort((a, b) => {
        if (a.doneQuantity === a.quantity && b.doneQuantity !== b.quantity) {
          return 1;
        } else if (a.doneQuantity !== a.quantity && b.doneQuantity === b.quantity) {
          return -1;
        } else {
          return 0;
        }
      });

    return {
      ...workGroup,
      workEntityList: sortedWorkEntityList,
    };
  });

  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    setIsLoading(true);
    getWorksGroups(projectId)
      .then((res) => {
        dispatch(addWorksGroups(res.data));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
      <Table>
        <TableHeader>
          <TableRow key="worksHeader">
            <TableHead className="flex-1">Работы</TableHead>
            <TableHead className="flex-2 w-[180px] text-center px-1">
              Крайний срок
            </TableHead>
            <TableHead className="flex-2 w-[180px] text-center px-1">
              Прогресс работы
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <Table>
        {sortedWorkGroups.map((worksGroup) =>
          worksGroup.workEntityList.map((workEntity) => (
            <TableBody key={workEntity.id}>
              <TableRow
                onClick={() =>
                  onOpen("updateWorkProgress", { work: workEntity, projectId: projectId })
                }
                key={workEntity.id}
                className="flex hover:bg-muted/0 rounded-lg cursor-pointer hover:bg-neutral-100 transition"
              >
                <TableCell className="flex gap-x-1 items-center flex-1 text-left">
                  {workEntity.quantity === workEntity.doneQuantity && <CheckSquare2 className="text-emerald-500" />}
                  {workEntity.name}
                </TableCell>
                <TableCell className="flex-2 w-[180px] text-center px-1">
                  {formateComplexDate(workEntity.endDate)}
                </TableCell>
                <TableCell className="flex-2 w-[180px] text-center px-1">
                  <p>
                    <span className={cn("text-red-500", workEntity.quantity === workEntity.doneQuantity && "text-emerald-500")}>
                      {workEntity.doneQuantity}
                    </span>
                    /{workEntity.quantity} {workEntity.measureUnit}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
    </div>
  );
};

export default Works;
