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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { PlusSquare } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const worksGroups = useAppSelector(
    (state) => state.worksGroupsReducer.worksGroups
  );
  const dispatch = useAppDispatch();

  const { onOpen } = useModal();

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
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="w-[24%] px-4">Ресурсы и работа</TableHead>
            <TableHead className="w-[140px]">Кол-во</TableHead>
            <TableHead className="w-[140px]">Ед. изм.</TableHead>
            <TableHead className="w-[140px]">Цена, ед.</TableHead>
            <TableHead className="w-[140px]">Себестоимость</TableHead>
            <TableHead className="w-[140px]">Наценка</TableHead>
            <TableHead className="w-[140px]">Цена для заказчика</TableHead>
            <TableHead className="w-[140px]">Стоим. для заказчика</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {worksGroups.map((worksGroup) => (
        <React.Fragment key={worksGroup.id}>
          <div className="bg-neutral-200 rounded-lg p-3 shadow-xl my-5">
            <p className="text-neutral-500 text-xl font-bold">
              {worksGroup.number}. {worksGroup.name}
            </p>
          </div>
          {worksGroup.workEntityList.map((workEntity) => (
            <Accordion key={workEntity.id} type="single" collapsible>
              <AccordionItem value={workEntity.name}>
                <AccordionTrigger className="py-0">
                  <Table>
                    <TableBody>
                      <TableRow
                        key={workEntity.id}
                        className="hover:bg-muted/0"
                      >
                        <TableCell className="px-4 w-[20%] text-left">
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
                          {workEntity.costPricePerUnit}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.costPrice}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.extraCharge}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.orderPricePerUnit}
                        </TableCell>
                        <TableCell className="px-1 w-[140px]">
                          {workEntity.orderPrice}
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
                          <TableCell className="w-[22%] px-4">
                            {resourceEntity.name}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.quantity}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.measureUnit}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.costPricePerUnit}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.costPrice}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.extraCharge}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.orderPricePerUnit}
                          </TableCell>
                          <TableCell className="px-1 w-[140px] text-center">
                            {resourceEntity.orderPrice}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ))}

                  <button
                    className="flex items-center gap-x-3 p-3"
                    onClick={() => onOpen("addResourceModal", {work: workEntity})}
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
            data={{ worksGroupId: worksGroup.id, workGroups: worksGroups }}
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

export default Page;
