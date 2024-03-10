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
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { updateMoneyAccount } from "@/http/organisations/organisationsAPI";
import { editMoneyAccount } from "@/lib/features/organisations/organisationsSlice";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, {
      message: "Обязательно для заполнения.",
    })
    .max(50, {
      message: "Название счета не должно превышать 50 символов.",
    }),
  organisationId: z.string({ required_error: "Выберите организацию." }),
  balance: z.coerce
    .number({
      invalid_type_error: "Введите числовое значение.",
      required_error: "Обязательно для заполнения.",
    })
    .nonnegative({ message: "Баланс не может быть отрицательным." }),
  numberOfAccount: z.string({ required_error: "Обязательно для заполнения." }),
});

export const EditMoneyAccountModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const { moneyAccountName, organisationId, balance, numberOfAccount } = data;

  const isModalOpen = isOpen && type === "editMoneyAccount";

  const dispatch = useAppDispatch();

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (moneyAccountName) {
      form.setValue("name", moneyAccountName);
    }

    if (organisationId) {
      form.setValue("organisationId", organisationId.toString());
    }

    if (balance) {
      form.setValue("balance", balance);
    }
    if (numberOfAccount) {
      form.setValue("numberOfAccount", numberOfAccount);
    }
  }, [
    form,
    moneyAccountName,
    organisationId,
    balance,
    numberOfAccount,
    isOpen,
  ]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateMoneyAccount({
        moneyAccountId: data.moneyAccountId!,
        moneyAccountName: values.name,
        organisationId: data.organisationId!,
        balance: values.balance,
        numberOfAccount: values.numberOfAccount,
      });

      const dataForEditMoneyAccount = {
        moneyAccountId: response.data.id,
        moneyAccountName: response.data.name,
        organisationId: response.data.organisationId,
        balance: response.data.balance,
        numberOfAccount: response.data.numberOfAccount,
      };
      dispatch(editMoneyAccount(dataForEditMoneyAccount));

      form.reset();
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании счета.");
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
          <DialogTitle>Редактрирование счета</DialogTitle>
          <DialogDescription>Введите новые данные счета.</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название счета</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Название счета..."
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
              name="organisationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Организация</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите оргазнизацию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organisations.map((organisation) => (
                        <SelectItem
                          key={organisation.id}
                          value={organisation.id.toString()}
                        >
                          {organisation.name}
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
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Баланс счета</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Баланс счета..."
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
              name="numberOfAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите номер счета</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Номер счета..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
