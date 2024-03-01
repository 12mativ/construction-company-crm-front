"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getProjectQueries } from "@/http/projects/projectQueriesAPI";
import { addProjectQueries } from "@/lib/features/project-queries/projectQueriesSlice";
import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { formateComplexDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bolt, BrickWall, Shield, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import AddButton from "../addButton";

const formSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.coerce.number(),
        factQuantity: z.coerce.number(),
        factCostPerUnit: z.coerce.number(),
        factCostPrice: z.coerce.number(),
        profit: z.coerce.number(),
        needDate: z.string(),
        resourceEntity: z.object({
          id: z.coerce.number(),
          name: z.string(),
          measureUnit: z.string(),
          quantity: z.coerce.number(),
          costPricePerUnit: z.coerce.number(),
          orderPricePerUnit: z.coerce.number(),
          extraCharge: z.coerce.number(),
          costPrice: z.coerce.number(),
          orderPrice: z.coerce.number(),
          resourceType: z.string() as z.ZodType<ResourceType, any, any>,
          workId: z.coerce.number(),
        }),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: "Вам нужно выбрать хотя бы один элемент для создания заказа.",
    }),
});

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
  const { onOpen } = useModal();
  const dispatch = useAppDispatch();
  const projectQueries = useAppSelector(
    (state) => state.projectQueriesReducer.projectQueries
  );
  const { projectId } = useParams<{ projectId: string }>();

  const sortedProjectQueries = projectQueries.slice().sort((a, b) => {
    const dateA = new Date(a.needDate);
    const dateB = new Date(b.needDate);

    return dateB.getTime() - dateA.getTime();
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dataForOrder = values.items.map((item) => ({
      id: item.id,
      factQuantity: item.factQuantity,
      factCostPerUnit: item.factCostPerUnit
    }))

    onOpen("createOrder", {orders: dataForOrder})
  };

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
          <TableRow key="projectQueriesHeader">
            <TableHead className="flex-1 px-4">Ресурсы</TableHead>
            <TableHead className="w-[140px] text-center">Дата</TableHead>
            <TableHead className="w-[140px] text-center">Кол-во</TableHead>
            <TableHead className="w-[140px] text-center">Цена, ед.</TableHead>
            <TableHead className="w-[140px] text-center">План</TableHead>
            <TableHead className="w-[140px] text-center">Факт</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <>
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <>
                  {sortedProjectQueries.map((projectQuery) => (
                    <FormField
                      key={projectQuery.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <>
                            <div className="flex items-center">
                              <FormItem
                                key={projectQuery.id}
                                className="flex items-center"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="items-center mt-1 w-6 h-6"
                                    checked={field.value?.some(
                                      (value) => value.id === projectQuery.id
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            {
                                              id: projectQuery.id,
                                              factQuantity:
                                                projectQuery.factQuantity,
                                              factCostPerUnit:
                                                projectQuery.factCostPerUnit,
                                              factCostPrice:
                                                projectQuery.factCostPrice,
                                              profit: projectQuery.profit,
                                              needDate: projectQuery.needDate,
                                              resourceEntity:
                                                projectQuery.resourceEntity,
                                            },
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value.id !== projectQuery.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                              </FormItem>

                              <div className="flex-1 px-4">
                                <div className="flex gap-x-1 items-center">
                                  {
                                    iconMap[
                                      projectQuery.resourceEntity.resourceType
                                    ]
                                  }
                                  {projectQuery.resourceEntity.name}
                                </div>
                              </div>
                              <div className="px-1 w-[140px] text-center">
                                {formateComplexDate(projectQuery.needDate)}
                              </div>
                              <div className="px-1 w-[140px] text-center">
                                {projectQuery.resourceEntity.quantity}{" "}
                                {projectQuery.resourceEntity.measureUnit}
                              </div>
                              <div className="px-1 w-[140px] text-center">
                                {projectQuery.resourceEntity.costPricePerUnit} ₽
                              </div>
                              <div className="px-1 w-[140px] text-center">
                                {projectQuery.resourceEntity.costPrice} ₽
                              </div>
                              <div className="px-1 w-[140px] text-center">
                                {projectQuery.factCostPrice} ₽
                              </div>
                            </div>
                          </>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </>
              )}
            />
          </>
          <Button disabled={isLoading} type="submit">
            Сформиовать заказ
          </Button>
        </form>
      </Form>

      {/* <AddButton buttonText="Заказ" modalName="createWorkGroup" /> */}
    </div>
  );
};

export default ProjectQueries;
