"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { createIncome } from "@/http/transactions/transactionsAPI";
import { changeMoneyAccount } from "@/lib/features/organisations/organisationsSlice";
import { addIncome } from "@/lib/features/transactions/transactionsSlice";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  recipientMoneyAccountId: z.string({
    required_error: "Выберите счет зачисления.",
  }),
  senderCounterpartyId: z.string({
    required_error: "Выберите контрагента.",
  }),
  amount: z.coerce
    .number({
      invalid_type_error: "Введите числовое значение.",
      required_error: "Обязательно для заполнения.",
    })
    .positive({ message: "Сумма дохода должна быть положительной." }),
  description: z
    .string({ required_error: "Описание операции обязательно." })
    .min(1, { message: "Описание операции обязательно." })
    .max(100, { message: "Описание не должно превышать 100 символов." }),
  date: z.date({
    required_error: "Дата транзакции обязательна.",
  }),
});

export const CreateIncomeModal = () => {
  const [incomeError, setIncomeError] = useState("");

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createIncome";

  const dispatch = useAppDispatch();

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createIncome(
        values.amount,
        +values.recipientMoneyAccountId,
        +values.senderCounterpartyId,
        values.description,
        format(values.date, "yyyy-MM-dd")
      );

      const dataForTransfer = {
        id: response.data.id,
        amount: response.data.amount,
        senderCounterpartyId: response.data.partnerId,
        recipientMoneyAccountId: response.data.recipientMoneyAccountId,
        description: response.data.description,
        date: response.data.timestamp,
      };

      dispatch(addIncome(dataForTransfer));
      dispatch(
        changeMoneyAccount({
          id: +values.recipientMoneyAccountId,
          amount: values.amount,
          operation: "increase",
        })
      );

      handleClose();
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setIncomeError(err.response?.data.message);
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
          <DialogTitle>Расход</DialogTitle>
          <DialogDescription>Введите данные расхода.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="recipientMoneyAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Счет получателя</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите cчет получателя" />
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
              name="senderCounterpartyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Контрагент</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите контрагента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {incomeError && <p className="text-red-500 py-2">{incomeError}</p>}

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
