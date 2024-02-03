"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getResourcePatterns } from "@/http/resources/resourcesAPI";
import {
  ResourceType,
  addResourcesPatterns,
} from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bolt, BrickWall, Shield, UserRound } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IWorkEntity, addResourceToWork } from "@/lib/features/works-groups/worksGroupsSlice";
import { updateWork } from "@/http/works-groups/worksAPI";

interface ResourcesTableProps {
  currentWork: IWorkEntity;
  onClose: () => void;
}

const formSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.coerce.number(),
        resourceType: z.string() as z.ZodType<ResourceType, any, any>,
        name: z.string(),
        quantity: z.number().refine((value) => value > 0, {
          message: "Количество должно быть больше нуля.",
        }),
        costPricePerUnit: z.coerce.number(),
        orderPricePerUnit: z.coerce.number(),
        extraCharge: z.coerce.number(),
        measureUnit: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: "Вам нужно выбрать хотя бы один элемент.",
    }),
});

const ResourcesTable = ({currentWork, onClose}: ResourcesTableProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await updateWork({
      workId: currentWork.id,
      name: currentWork.name,
      number: currentWork.number,
      quantity: currentWork.quantity,
      measureUnit: currentWork.measureUnit,
      startDate: currentWork.startDate,
      endDate: currentWork.endDate,
      worksGroupId: currentWork.worksGroupId,
      resourceEntityList: [
        ...values.items,
        ...currentWork.resourceEntityList,
      ],
    });

    dispatch(addResourceToWork(response.data));
    onClose();
  };

  const [isResourcePatternsLoading, setIsResourcePatternsLoading] =
    useState(false);

  const resourcesPatterns = useAppSelector(
    (state) => state.resourcesPatternsReducer.resourcesPatterns
  );

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
    <>
      <Table className="mb-2 ">
        <TableBody className="border-b">
          <TableRow
            key="mainHeader"
            className="flex text-neutral-400 text-[16px]"
          >
            <TableCell className="flex-1">Ресурсы</TableCell>
            <TableCell className="flex-1 w-[130px] text-center px-1">
              Цена, ед.
            </TableCell>
            <TableCell className="flex-2 w-[130px] text-center px-1">
              Наценка
            </TableCell>
            <TableCell className="flex-2 w-[275px] text-center px-1">
              Цена для заказчика
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <>
                {resourcesPatterns.map((resourcesPattern) => (
                  <Fragment key={resourcesPattern.type}>
                    <Accordion type="single" collapsible>
                      <AccordionItem
                        value={resourcesPattern.name}
                        className="p-2 "
                      >
                        <AccordionTrigger
                          className="w-fit bg-neutral-100 shadow-lg font-medium 
                        text-lg rounded-lg p-2"
                        >
                          {resourcesPattern.name}
                        </AccordionTrigger>

                        <AccordionContent className="bg-neutral-200 rounded-b-lg px-10 py-2">
                          {resourcesPattern.resources.map((resource) => (
                            <FormField
                              key={resource.id}
                              control={form.control}
                              name="items"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={resource.id}
                                    className="flex items-center gap-x-2"
                                  >
                                    <FormControl>
                                      <>
                                        <Checkbox
                                          className="items-center mt-1"
                                          checked={field.value?.some(
                                            (value) => value.id === resource.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  {
                                                    id: resource.id,
                                                    name: resource.name,
                                                    resourceType:
                                                      resource.resourceType,
                                                    costPricePerUnit:
                                                      resource.costPricePerUnit,
                                                    orderPricePerUnit:
                                                      resource.orderPricePerUnit,
                                                    extraCharge:
                                                      resource.extraCharge,
                                                    measureUnit:
                                                      resource.measureUnit,
                                                    quantity: 1,
                                                  },
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value.id !== resource.id
                                                  )
                                                );
                                          }}
                                        />
                                      </>
                                    </FormControl>

                                    <div className="flex w-full items-center last:border-b-0 border-b-2 bg-neutral-200 border-neutral-400">
                                      <div className="flex-1 flex items-center gap-x-2 px-1">
                                        {iconMap[resource.resourceType]}
                                        <p>{resource.name}</p>
                                      </div>
                                      <div className="flex-2 w-[155px] text-center px-1">
                                        {resource.costPricePerUnit} ₽
                                      </div>
                                      <div className="flex-2 w-[155px] text-center px-1">
                                        {resource.extraCharge} %
                                      </div>
                                      <div className="flex-2 w-[165px] text-center px-1">
                                        {resource.orderPricePerUnit} ₽
                                      </div>
                                      {field.value?.some(
                                          (item) => item.id === resource.id
                                        ) && (
                                          <div className="flex flex-col gap-y-1 p-2">
                                            <FormLabel className="text-center">Кол-во</FormLabel>
                                            <Input
                                              className="w-12 text-center "
                                              value={
                                                field.value.find(
                                                  (item) =>
                                                    item.id === resource.id
                                                )?.quantity
                                              }
                                              onChange={(e) => {
                                                const quantity = parseInt(
                                                  e.target.value,
                                                  10
                                                );
                                                if (!isNaN(quantity)) {
                                                  field.onChange(
                                                    field.value?.map((item) =>
                                                      item.id === resource.id
                                                        ? {
                                                            ...item,
                                                            quantity: Math.max(
                                                              1,
                                                              quantity
                                                            ),
                                                          }
                                                        : item
                                                    )
                                                  );
                                                }
                                              }}
                                            />
                                          </div>
                                        )}
                                    </div>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Fragment>
                ))}
                <FormMessage />
              </>
            )}
          />
          <Button type="submit" className="hover:bg-red-600 " >Создать</Button>
        </form>
      </Form>
    </>
  );
};

export default ResourcesTable;
