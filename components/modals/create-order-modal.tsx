"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createOrder } from "@/http/orders/ordersAPI";
import { addOrder } from "@/lib/features/orders/ordersSlice";
import axios, { AxiosError } from "axios";
import { removeProjectQueries } from "@/lib/features/project-queries/projectQueriesSlice";

export const CreateOrderModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [totalCosts, setTotalCosts] = useState<{ [key: number]: number }>({});
  const [createOrderError, setCreateOrderError] = useState("");
  const { orders } = data;
  const { projectId } = useParams<{ projectId: string }>();
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "createOrder";

  const form = useForm({});

  const setOrderValues = (
    orderId: number,
    factQuantity: number | string,
    factCostPerUnit: number | string
  ) => {
    form.setValue(`orders.${orderId}.id`, orderId);
    form.setValue(`orders.${orderId}.factQuantity`, factQuantity);
    form.setValue(`orders.${orderId}.factCostPerUnit`, factCostPerUnit);
  };

  const { getValues } = form;

  const handleQuantityChange = (orderId: number, value: string) => {
    const quantity = parseFloat(value.replace(",", "."));
    const newTotalCosts = { ...totalCosts };
    newTotalCosts[orderId] =
      quantity * getValues(`orders.${orderId}.factCostPerUnit`) || 0;
    setTotalCosts(newTotalCosts);
  };

  const handleCostPerUnitChange = (orderId: number, value: string) => {
    const costPerUnit = parseFloat(value.replace(",", "."));
    const newTotalCosts = { ...totalCosts };
    newTotalCosts[orderId] =
      costPerUnit * getValues(`orders.${orderId}.factQuantity`) || 0;
    setTotalCosts(newTotalCosts);
  };

  const isFormLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: {
    partnerId: string;
    description: string;
    creationDate: Date;
    paymentDate: Date;
    orders: { id: number; factQuantity: string; factCostPerUnit: string }[];
  }) => {
    try {
      const dataForCreateOrder = {
        partnerId: +values.partnerId,
        queryEntityList: values.orders.filter((order) => order !== null).map((order) => ({
          id: order.id,
          newFactQuantity: +order.factQuantity,
          newFactCostPerUnit: +order.factCostPerUnit,
        })),
        projectId: +projectId,
        creationDate: format(values.creationDate, "yyyy-MM-dd"),
        paymentDate: format(values.paymentDate, "yyyy-MM-dd"),
        description: values.description,
      };

      const response = await createOrder({ ...dataForCreateOrder });
      const idsForRemoveQueries = response.data.queryEntityList.map((queryEntity) => queryEntity.id);
      dispatch(addOrder(response.data));
      dispatch(removeProjectQueries(idsForRemoveQueries));
      handleClose();
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setCreateOrderError(err.response?.data.message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (orders) {
      orders.forEach((order) => {
        setOrderValues(order.id, order.factQuantity, order.factCostPerUnit);
      });
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      orders.forEach((order) => {
        form.setValue(`orders.${order.id}.factQuantity`, order.factQuantity);
        form.setValue(
          `orders.${order.id}.factCostPerUnit`,
          order.factCostPerUnit
        );
      });
    }
  }, [form, orders, isOpen]);

  useEffect(() => {
    if (orders) {
      const newTotalCosts: { [key: number]: number } = {};
      orders.forEach((order) => {
        const totalCost = order.factQuantity * order.factCostPerUnit;
        newTotalCosts[order.id] = totalCost;
      });
      setTotalCosts(newTotalCosts);
    }
  }, [orders]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[75%] md:w-[50%]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Создать заказ</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          {/* //
            @ts-ignore */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="partnerId"
              rules={{
                required: "Выберите поставщика",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Поставщик</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите контрагента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {counterparties.length === 0 && (
                        <div className="p-2">
                          <p>Пока не создан ни один поставщик.</p>
                          <p>
                            Вы можете создать его на странице «Справочники» в
                            главном меню.
                          </p>
                        </div>
                      )}
                      {counterparties.map((counterparty) => (
                        <SelectItem
                          key={counterparty.id}
                          value={counterparty.id.toString()}
                        >
                          <span className="font-semibold">
                            {counterparty.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ScrollArea className="h-[70%] w-full p-3">
              {orders?.map((order) => {
                const quantityFieldName = `orders.${order.id}.factQuantity`;
                const costPerUnitFieldName = `orders.${order.id}.factCostPerUnit`;
                const { watch } = form;
                watch((values, { name }) => {
                  if (name === quantityFieldName) {
                    //@ts-ignore
                    const quantity = parseFloat(getValues(quantityFieldName));
                    handleQuantityChange(order.id, String(quantity));
                  }
                });
                watch((values, { name }) => {
                  if (name === costPerUnitFieldName) {
                    //@ts-ignore
                    const costPerUnit = parseFloat(
                      getValues(costPerUnitFieldName)
                    );
                    handleCostPerUnitChange(order.id, String(costPerUnit));
                  }
                });

                return (
                  <div
                    key={order.id}
                    className="w-full flex items-center gap-x-3 p-2"
                  >
                    <p className="flex-1 w-[100px] truncate">{order.name}</p>
                    <FormField
                      rules={{
                        required: "Поле не может быть пустым",
                        min: {
                          value: 0,
                          message: "Число должно быть положительным",
                        },
                      }}
                      control={form.control}
                      name={`orders.${order.id}.factQuantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Кол-во</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Введите количество..."
                              disabled={isFormLoading}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                          <FormMessage className="mt-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      rules={{
                        required: "Поле не может быть пустым",
                        min: {
                          value: 0,
                          message: "Число должно быть положительным",
                        },
                      }}
                      control={form.control}
                      name={`orders.${order.id}.factCostPerUnit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Цена, ед.</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Введите количество..."
                              disabled={isFormLoading}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">Стоимость</span>
                      <p className="flex items-center h-[40px] mt-1">
                        {totalCosts[order.id]} ₽
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-x-3 items-center mb-3 mt-4 pt-4 border-t-2 border-dashed border-neutral-400">
                <FormField
                  control={form.control}
                  name="creationDate"
                  rules={{
                    required: "Выберите дату",
                  }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата создания заказа</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd.MM.yyyy")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={() => false}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentDate"
                  rules={{
                    required: "Выберите дату",
                  }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Оплатить до</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd.MM.yyyy")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={() => false}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                rules={{
                  required: "Введите название заказа",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название заказа</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Название заказа..."
                        disabled={isFormLoading}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollArea>

            {createOrderError && (
              <p className="text-red-500 py-2">{createOrderError}</p>
            )}

            <Button
              disabled={isFormLoading}
              type="submit"
              className="hover:bg-red-600"
            >
              Сформировать
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
