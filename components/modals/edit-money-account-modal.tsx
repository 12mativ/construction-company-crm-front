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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";

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
  const {moneyAccountId, moneyAccountName, organisationId, balance, numberOfAccount} = data;

  const isModalOpen = isOpen && type === "updateMoneyAccount";

  const dispatch = useAppDispatch();

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  useEffect(() => { 
    if (moneyAccountName) { 
      form.setValue('name', moneyAccountName) 
    }
    if (typeof organisationId === 'number') {   
      form.setValue('organisationId', organisationId.toString())  
      
      // {organisations.map((organisation) => (
        
      //     form.setValue('organisationId', organisation.name) 
        
      // ))}
    }

    //   const selectedOrg = organisations.find(org => org.id === organisationId);
      
    //   if (selectedOrg) {
    //     form.setValue('organisationId', selectedOrg.id.toString());
    //   }
    // 

    if (balance) { 
      form.setValue('balance', balance) 
    } 
    if (numberOfAccount) {
      form.setValue('numberOfAccount', numberOfAccount) 
    } 
  }, [form, moneyAccountId, moneyAccountName, organisationId, balance, numberOfAccount]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await updateMoneyAccount({moneyAccountId: data.moneyAccountId!, moneyAccountName: values.name, organisationId: data.organisationId!, balance: values.balance, numberOfAccount: values.numberOfAccount});

    const dataForEditMoneyAccount = {moneyAccountId: response.data.id,moneyAccountName: response.data.name, organisationId: response.data.organisationId, balance: response.data.balance, numberOfAccount: response.data.numberOfAccount}
    dispatch(editMoneyAccount(dataForEditMoneyAccount));

    form.reset();
    handleClose();
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
                  <Select onValueChange={field.onChange}>
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
