"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns'

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { createTransfer } from "@/http/transactions/transactionsAPI";
import { changeMoneyAccount } from "@/lib/features/organisations/organisationsSlice";
import { addTransfer } from "@/lib/features/transactions/transactionsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  senderId: z.string({ required_error: "Выберите отправителя." }),
  recipientId: z.string({ required_error: "Выберите получателя." }),
  amount: z.coerce
    .number({
      invalid_type_error: "Введите числовое значение.",
      required_error: "Обязательно для заполнения.",
    })
    .positive({ message: "Сумма перевода должна быть положительной." }),
  description: z
    .string({ required_error: "Описание операции обязательно." })
    .min(1, { message: "Описание операции обязательно." })
    .max(100, { message: "Описание не должно превышать 100 символов." }),
  date: z.date({
    required_error: "Дата транзакции обязательна.",
  }),
});

export const CreateTransferModal = () => {
  const [transferError, setTransferError] = useState("");

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createTransfer";

  const dispatch = useAppDispatch();

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createTransfer(
        values.amount,
        +values.senderId,
        +values.recipientId,
        values.description,
        format(values.date, 'yyyy-MM-dd')
      );

      const dataForTransfer = {
        id: response.data.id,
        amount: response.data.amount,
        senderMoneyAccountId: response.data.senderMoneyAccountId,
        recipientMoneyAccountId: response.data.recipientMoneyAccountId,
        description: response.data.description,
        date: response.data.timestamp,
      };

      dispatch(addTransfer(dataForTransfer));
      dispatch(
        changeMoneyAccount({
          id: +values.recipientId,
          amount: values.amount,
          operation: "increase",
        })
      );
      dispatch(
        changeMoneyAccount({
          id: +values.senderId,
          amount: values.amount,
          operation: "decrease",
        })
      );

      handleClose();
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setTransferError(err.response?.data.message);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Перевод</DialogTitle>
          <DialogDescription>Введите данные перевода.</DialogDescription>
        </DialogHeader>
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
                      {organisations.map((organisation) => (
                        <React.Fragment key={organisation.id}>
                          {organisation.moneyAccountList.map((moneyAccount) => (
                            <SelectItem
                              key={moneyAccount.id}
                              value={moneyAccount.id.toString()}
                            >
                              <span className="font-semibold">
                                {moneyAccount.name}
                              </span>{" "}
                              (Баланс: {moneyAccount.balance} ₽)
                            </SelectItem>
                          ))}
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
              name="recipientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Счет получателя</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите счет получателя" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organisations.map((organisation) => (
                        <React.Fragment key={organisation.id}>
                          {organisation.moneyAccountList.map((moneyAccount) => (
                            <SelectItem
                              key={moneyAccount.id}
                              value={moneyAccount.id.toString()}
                            >
                              <span className="font-semibold">
                                {moneyAccount.name}
                              </span>{" "}
                              (Баланс: {moneyAccount.balance} ₽)
                            </SelectItem>
                          ))}
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сумма</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Сумма перевода..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание операции</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Описание операции..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
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

            {transferError && (
              <p className="text-red-500 py-2">{transferError}</p>
            )}

            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Отправить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
