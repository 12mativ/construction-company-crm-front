"use client";

import AddButton from "@/components/addButton";
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
import { getProjectQueries } from "@/http/projects/projectQueriesAPI";
import { addProjectQueries } from "@/lib/features/project-queries/projectQueriesSlice";
import { formateComplexDate } from "@/lib/utils";
import { Bolt, BrickWall, Shield, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectQueries = () => {
  const iconMap = {
    ["HUMAN"]: (
      <UserRound
        className="bg-neutral-100 text-neutral-500 rounded-full p-1"
        size={30}
      />
    ),
    ["MECHANICAL"]: (
      <Bolt
        className="bg-neutral-100 text-neutral-500 rounded-full p-1"
        size={30}
      />
    ),
    ["MATERIAL"]: (
      <BrickWall
        className="bg-neutral-100 text-neutral-500 rounded-full p-1"
        size={30}
      />
    ),
    ["INVOICES"]: (
      <Shield
        className="bg-neutral-100 text-neutral-500 rounded-full p-1"
        size={30}
      />
    ),
  };

  const [isLoading, setIsLoading] = useState(false);

  const projectQueries = useAppSelector(
    (state) => state.projectQueriesReducer.projectQueries
  );

  const sortedProjectQueries = projectQueries.slice().sort((a, b) => {
    const dateA = new Date(a.needDate);
    const dateB = new Date(b.needDate);

    return dateB.getTime() - dateA.getTime();
  });

  const dispatch = useAppDispatch();

  const { onOpen } = useModal();

  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    setIsLoading(true);
    getProjectQueries(+projectId)
      .then((res) => {
        dispatch(addProjectQueries(res.data));
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
          <TableRow key="projectHeader">
            <TableHead className="flex-1 px-4">Ресурсы</TableHead>
            <TableHead className="w-[140px] text-center">Дата</TableHead>
            <TableHead className="w-[140px] text-center">Кол-во</TableHead>
            <TableHead className="w-[140px] text-center">Цена, ед.</TableHead>
            <TableHead className="w-[140px] text-center">План</TableHead>
            <TableHead className="w-[140px] text-center">Факт</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjectQueries.map((projectQuery) => (
            <TableRow key={projectQuery.resourceEntity.id}>
              <TableCell className="flex-1 px-4">
                <div className="flex gap-x-1 items-center">
                  {iconMap[projectQuery.resourceEntity.resourceType]}
                  {projectQuery.resourceEntity.name}
                </div>
              </TableCell>
              <TableCell className="px-1 w-[140px] text-center">
                {formateComplexDate(projectQuery.needDate)}
              </TableCell>
              <TableCell className="px-1 w-[140px] text-center">
                {projectQuery.resourceEntity.quantity}{" "}
                {projectQuery.resourceEntity.measureUnit}
              </TableCell>
              <TableCell className="px-1 w-[140px] text-center">
                {projectQuery.resourceEntity.costPricePerUnit} ₽
              </TableCell>
              <TableCell className="px-1 w-[140px] text-center">
                {projectQuery.resourceEntity.costPrice} ₽
              </TableCell>
              <TableCell className="px-1 w-[140px] text-center">
                {projectQuery.factCostPrice} ₽
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <AddButton buttonText="Заказ" modalName="createWorkGroup" /> */}
    </div>
  );
};

export default ProjectQueries;
