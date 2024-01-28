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
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const worksGroups = useAppSelector(
    (state) => state.worksGroupsReducer.worksGroups
  );
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
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="w-[30%] px-4">Ресурсы и работа</TableHead>
            <TableHead className="w-[10%]">Кол-во</TableHead>
            <TableHead className="w-[10%]">Ед. изм.</TableHead>
            <TableHead className="w-[10%]">Цена, ед.</TableHead>
            <TableHead className="w-[10%]">Себестоимость</TableHead>
            <TableHead className="w-[10%]">Наценка</TableHead>
            <TableHead className="w-[10%]">
              Цена для заказчика
            </TableHead>
            <TableHead className="w-[10%]">
              Стоим. для заказчика
            </TableHead>
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
            <Table key={workEntity.id}>
              <TableBody>
                <TableRow key={workEntity.id}>
                  <TableCell className="w-[30%] px-4">
                    {workEntity.name}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.quantity}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.measureUnit}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.costPricePerUnit}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.costPrice}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.extraCharge}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.orderPricePerUnit}
                  </TableCell>
                  <TableCell className="px-4 w-[10%]">
                    {workEntity.orderPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          <AddButton
            buttonText="Новая работа"
            modalName="createWork"
            data={{ workGroupId: worksGroup.id, workGroups: worksGroups }}
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
