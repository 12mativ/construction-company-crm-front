"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getResourcePatterns } from "@/http/resources/resourcesAPI";
import { addResourcesPatterns } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { Bolt, BrickWall, Plus, Shield, UserRound } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

const ResourcePatterns = () => {
  const [isResourcePatternsLoading, setIsResourcePatternsLoading] =
    useState(false);

  const resourcesPatterns = useAppSelector(
    (state) => state.resourcesPatternsReducer.resourcesPatterns
  );

  const { onOpen } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsResourcePatternsLoading(true);

    getResourcePatterns()
      .then((res) => {
        dispatch(addResourcesPatterns(res.data));
      })
      .finally(() => {
        setIsResourcePatternsLoading(false);
      });
  }, []);

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

  if (isResourcePatternsLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <Table className="mb-2">
        <TableBody className="border-b">
          <TableRow
            key="mainHeader"
            className="flex text-neutral-400 px-10 text-[16px]"
          >
            <TableCell className="flex-1">Ресурсы</TableCell>
            <TableCell className="flex-2 w-[165px] text-center px-1">
              Цена, ед.
            </TableCell>
            <TableCell className="flex-2 w-[165px] text-center px-1">
              Наценка
            </TableCell>
            <TableCell className="flex-2 w-[167px] text-center px-1">
              Цена для заказчика
            </TableCell>
            <TableCell className="flex w-[80px] text-center px-1"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {resourcesPatterns.map((resourcesPattern) => (
        <Fragment key={resourcesPattern.type}>
          <Accordion
            type="single"
            collapsible
            defaultValue={resourcesPattern.name}
          >
            <AccordionItem value={resourcesPattern.name} className="p-2 ">
              <AccordionTrigger
                className="w-fit bg-neutral-100 shadow-lg font-medium 
                  text-lg rounded-lg p-2"
              >
                {resourcesPattern.name}
              </AccordionTrigger>

              <AccordionContent className="bg-neutral-200 rounded-b-lg px-10 pt-0 pb-2">
                {resourcesPattern.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex group items-center transition last:border-b-0 border-b-2 bg-neutral-200 border-neutral-400 py-4"
                  >
                    <div className="flex-1 flex items-center gap-x-2 px-1">
                      {iconMap[resource.resourceType]}
                      <p>{resource.name}</p>
                    </div>
                    <div className="flex-2 w-[165px] text-center px-1">
                      {resource.costPricePerUnit} ₽
                    </div>
                    <div className="flex-2 w-[165px] text-center px-1">
                      {resource.extraCharge} %
                    </div>
                    <div className="flex-2 w-[167px] text-center px-1">
                      {resource.orderPricePerUnit} ₽
                    </div>
                    <div className="flex w-[70px] text-center px-1">
                      {/* <Pencil
                      onClick={() =>
                        onOpen("editResource", {
                          resourcePatternId: resource.id,
                          resourcePatternName: resource.name,
                          costPricePerUnit: resource.costPricePerUnit,
                          orderPricePerUnit: resource.orderPricePerUnit,
                          extraCharge: resource.extraCharge,
                          measureUnit: resource.measureUnit,
                          resourceType: resource.resourceType,
                        })
                      }
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                        p-1 text-neutral-500 transition"
                    />
                    <Trash2
                      onClick={() =>
                        onOpen("deleteResource", {
                          resourcePatternId: resource.id,
                          resourcePatternName: resource.name,
                        })
                      }
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                    p-1 text-red-400 transition"
                    /> */}
                    </div>
                  </div>
                ))}

                <div
                  className="group flex items-center gap-x-3 last:border-b-0 border-b-2 
                  border-neutral-400 hover:bg-neutral-500/30 mt-2 p-3 hover:cursor-pointer rounded-lg transition"
                  onClick={() =>
                    onOpen("createResourcePattern", {
                      resourceType: resourcesPattern.type,
                    })
                  }
                >
                  <Plus
                    className="bg-neutral-300 text-base text-neutral-500 group-hover:bg-red-600
                  group-hover:text-neutral-100 rounded-full p-1 transition"
                    size={30}
                  />
                  <div className="flex-1">Добавить ресурс</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Fragment>
      ))}
    </div>
  );
};

export default ResourcePatterns;
