"use client";

import AddButton from "@/components/addButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Bolt, BrickWall, PlusSquare, Shield, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const ProjectEstimate = () => {
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
  const [error, setError] = useState("");

  const worksGroups = useAppSelector(
    (state) => state.worksGroupsReducer.worksGroups
  );

  const sortedWorksGroupsByNumber = worksGroups.slice().sort((a, b) => a.number - b.number)

  const sortedWorkGroups = sortedWorksGroupsByNumber.map((workGroup) => {
    const sortedWorkEntityList = workGroup.workEntityList
      .slice()
      .sort((a, b) => a.number - b.number);

    return {
      ...workGroup,
      workEntityList: sortedWorkEntityList,
    };
  });

  const dispatch = useAppDispatch();

  const { onOpen } = useModal();

  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    setIsLoading(true);
    getWorksGroups(projectId)
      .then((res) => {
        dispatch(addWorksGroups(res.data));
      })
      .catch((error: AxiosError | any) => {
        setError("Произошла ошибка при загрузке работ.")
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
      {error && <ErrorAlert error={error} />}
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="w-[18%] px-4">Ресурсы и работа</TableHead>
            <TableHead className="w-[140px]">Кол-во</TableHead>
            <TableHead className="w-[140px]">Ед. изм.</TableHead>
            <TableHead className="w-[140px]">Цена, ед.</TableHead>
            <TableHead className="w-[140px]">Себестоимость</TableHead>
            <TableHead className="w-[140px]">Наценка</TableHead>
            <TableHead className="w-[140px]">Цена для заказчика</TableHead>
            <TableHead className="w-[140px]">Стоим. для заказчика</TableHead>
            <TableHead className="w-[10px]"></TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {sortedWorkGroups.map((worksGroup) => (
        <React.Fragment key={worksGroup.id}>
          <div
            className="flex h-[64px] items-center justify-between group 
        bg-neutral-200 rounded-lg p-4 pl-10 shadow-xl transition"
          >
            <p className="text-neutral-500 text-xl font-bold">
              {worksGroup.number}. {worksGroup.name}
            </p>
            <div className="flex items-center gap-x-2">
              <Pencil
                onClick={() =>
                  onOpen("editWorksGroup", {
                    worksGroup: {
                      worksGroupId: worksGroup.id,
                      worksGroupName: worksGroup.name,
                      worksGroupNumber: worksGroup.number,
                    },
                    projectId: projectId,
                  })
                }
                className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                  p-1 text-neutral-500 transition"
              />
              <Trash2
                onClick={() =>
                  onOpen("deleteWorksGroup", {
                    worksGroup: {
                      worksGroupId: worksGroup.id,
                      worksGroupName: worksGroup.name,
                      worksGroupNumber: worksGroup.number,
                    },
                    projectId: projectId,
                  })
                }
                className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
              p-1 text-red-400 transition"
              />
            </div>
          </div>
          {worksGroup.workEntityList.map((workEntity) => (
            <Accordion
              key={workEntity.id}
              type="single"
              collapsible
              className="overflow-x-auto"
            >
              <AccordionItem value={workEntity.name}>
                <AccordionTrigger className="py-0">
                  <Table className="overflow-x-auto">
                    <TableBody>
                      <TableRow
                        key={workEntity.id}
                        className="hover:bg-muted/0 group transition"
                      >
                        <TableCell className="px-4 w-[14%] text-left">
                          {worksGroup.number}.{workEntity.number}{" "}
                          {workEntity.name}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.quantity}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.measureUnit}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.costPricePerUnit} ₽
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.costPrice} ₽
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.extraCharge} %
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.orderPricePerUnit} ₽
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.orderPrice} ₽
                        </TableCell>
                        <TableCell className="px-1 w-[10px] group transition">
                          <div className="flex items-center gap-x-2">
                            <Pencil
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpen("editWork", {work:workEntity})
                              }}
                              className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                                p-1 text-neutral-500 transition"
                            />
                            <Trash2
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpen("deleteWork", {work: workEntity})
                              }}
                              className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                            p-1 text-red-400 transition"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionTrigger>

                <AccordionContent className="bg-neutral-100">
                  {workEntity.resourceEntityList.map((resourceEntity) => (
                    <Table key={resourceEntity.id}>
                      <TableBody>
                        <TableRow key={resourceEntity.id}>
                          <TableCell className="w-[16%] px-4">
                            <div className="flex gap-x-1 items-center">
                              {iconMap[resourceEntity.resourceType]}
                              {resourceEntity.name}
                            </div>
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.quantity}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.measureUnit}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.costPricePerUnit} ₽
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.costPrice} ₽
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.extraCharge} %
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.orderPricePerUnit} ₽
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.orderPrice} ₽
                          </TableCell>
                          <TableCell className="px-1 w-[10px] group transition">
                          <div className="flex items-center gap-x-2">
                            <Pencil
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpen("editResource", {resource: resourceEntity, work: workEntity})
                              }}
                              className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                                p-1 text-neutral-500 transition"
                            />
                            <Trash2
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpen("deleteResource", {resource: resourceEntity})
                              }}
                              className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                            p-1 text-red-400 transition"
                            />
                          </div>
                        </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ))}

                  <button
                    className="flex items-center gap-x-3 p-3"
                    onClick={() => onOpen("addResource", { work: workEntity })}
                  >
                    <PlusSquare />
                    Добавить ресурс
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <AddButton
            buttonText="Новая работа"
            modalName="createWork"
            data={{
              worksGroup: {
                worksGroupId: worksGroup.id,
                worksGroupName: worksGroup.name,
                worksGroupNumber: worksGroup.number,
              },
              workGroups: worksGroups,
            }}
          />
        </React.Fragment>
      ))}

      <AddButton
        buttonText="Новый заголовок"
        modalName="createWorkGroup"
        data={{ projectId: projectId, workGroups: worksGroups }}
      />
    </div>
  );
};

export default ProjectEstimate;
