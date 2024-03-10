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
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { updateCounterparty } from "@/http/counterparties/counterpartiesAPI";
import { editCounterparty } from "@/lib/features/counterparties/counterpartiesSlice";
import {
  PartnerType,
  addCounterparty,
} from "@/lib/features/counterparties/counterpartiesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, {
      message: "Обязательно для заполнения.",
    })
    .max(100, {
      message: "Название/имя контрагента не должно превышать 100 символов.",
    }),
  phoneNumber: z.string({ required_error: "Введите номер телефона." }),
  email: z
    .string({ required_error: "Введите электронную почту" })
    .email({ message: "Неверный формат электронной почты." }),
  partnerType: z.string({ required_error: "Выберите тип контрагента." }),
});

export const EditCounterpartyModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editCounterparty";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data.counterpartyName) {
      form.setValue("name", data.counterpartyName);
    }
    if (data.phoneNumber) {
      form.setValue("phoneNumber", data.phoneNumber);
    }
    if (data.email) {
      form.setValue("email", data.email);
    }
    if (data.partnerType) {
      form.setValue("partnerType", data.partnerType);
    }
  }, [
    form,
    data.partnerId,
    data.counterpartyName,
    data.phoneNumber,
    data.email,
    data.partnerType,
    isOpen,
  ]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateCounterparty({
        partnerId: data.partnerId!,
        counterpartyName: values.name!,
        phoneNumber: values.phoneNumber,
        email: values.email,
        partnerType: values.partnerType as PartnerType,
      });

      const dataForEditCounterparty = {
        partnerId: response.data.id!,
        counterpartyName: response.data.name!,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email,
        partnerType: response.data.partnerType,
      };
      dispatch(editCounterparty(dataForEditCounterparty));

      form.reset();
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании контрагента.");
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
          <DialogTitle>Редактирование контрагента</DialogTitle>
          <DialogDescription>
            Введите новые данные контрагента.
          </DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название/имя контрагента</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название/имя контрагента..."
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Номер телефона..."
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите электронную почту</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Электронная почта..."
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
              name="partnerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип контрагента</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип контрагента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PHYSICAL">Физическое лицо</SelectItem>
                      <SelectItem value="LEGAL">Юридическое лицо</SelectItem>
                    </SelectContent>
                  </Select>
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
