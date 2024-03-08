"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { createPayment } from "@/http/transactions/transactionsAPI";
import { removeOrder } from "@/lib/features/orders/ordersSlice";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { Bolt, BrickWall, CalendarIcon, Shield, UserRound } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table, TableHead, TableHeader, TableRow } from "../ui/table";

const formSchema = z.object({
  senderId: z.string({ required_error: "Выберите счет списания." }),
  timestamp: z.date({
    required_error: "Дата операции обязательна.",
  }),
});

export const CreateOrderPaymentModal = () => {
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
  const [paymentError, setPaymentError] = useState("");
  const { isOpen, onClose, type, data } = useModal();
  const dispatch = useAppDispatch();
  const isModalOpen = isOpen && type === "createOrderPayment";
  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createPayment({
        senderId: +values.senderId,
        orderId: data.order!.id,
        timestamp: format(values.timestamp, "yyyy-MM-dd"),
        description: data.order!.description,
      });
      dispatch(removeOrder({ orderId: data.order!.id }));
      handleClose();
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setPaymentError(err.response?.data.message);
      } else {
        console.log(err);
      }
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[75%] md:w-[50%]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Оплата заказа</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow key="orderEntityHeader">
              <TableHead className="flex-1 px-4">Название</TableHead>
              <TableHead className="w-[150px] text-center">Кол-во</TableHead>
              <TableHead className="w-[150px] text-center">Стоимость</TableHead>
              <TableHead className="w-[150px] text-center">Экономия</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <ScrollArea className="h-[100%] w-full">
          <div className="flex flex-col gap-y-2 mb-4">
            {data.order?.queryEntityList.map((queryEntity) => (
              <div className="flex items-center" key={queryEntity.id}>
                <div className="flex items-center gap-x-1 flex-1 px-4">
                  {iconMap[queryEntity.resourceEntity.resourceType]}
                  {queryEntity.resourceEntity.name}
                </div>
                <div className="w-[150px] text-center">
                  {queryEntity.factQuantity}
                </div>
                <div className="w-[150px] text-center">
                  {queryEntity.factCostPrice} ₽
                </div>
                <div className="w-[150px] text-center">
                  {queryEntity.profit} ₽
                </div>
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="senderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Счет отправителя</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите cчет отправителя" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organisations.every(
                          (organisation) =>
                            organisation.moneyAccountList.length == 0
                        ) && (
                          <div className="p-2">
                            <p>Пока не создан ни один счет.</p>
                            <p>
                              Вы можете создать его на странице «Настройки» в
                              главном меню.
                            </p>
                          </div>
                        )}
                        {organisations.map((organisation) => (
                          <React.Fragment key={organisation.id}>
                            {organisation.moneyAccountList.map(
                              (moneyAccount) => (
                                <SelectItem
                                  key={moneyAccount.id}
                                  value={moneyAccount.id.toString()}
                                >
                                  <span className="font-semibold">
                                    {moneyAccount.name}
                                  </span>{" "}
                                  (Баланс: {moneyAccount.balance} ₽)
                                </SelectItem>
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timestamp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Дата транзакции</FormLabel>
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

              {paymentError && (
                <p className="text-red-500 py-2">{paymentError}</p>
              )}

              <DialogFooter>
                <Button disabled={isLoading} type="submit">
                  Оплатить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
