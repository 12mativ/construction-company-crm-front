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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { createProject } from "@/http/projects/projectsAPI";
import { addProject } from "@/lib/features/projects/projectsSlice";
import { createCounterparty } from "@/http/counterparties/counterpartiesAPI";
import { PartnerType, addCounterparty } from "@/lib/features/counterparty/counterpartiesSlice";

const formSchema = z.object({
  name: z
    .string({required_error: "Обязательно для заполнения."})
    .min(1, {
      message: "Обязательно для заполнения.",
    })
    .max(100, {
      message: "Название/имя контрагента не должно превышать 100 символов.",
    }),
  phoneNumber: z.string({required_error: "Введите номер телефона."}),
  email: z.string({required_error: "Введите электронную почту"}).email({message: "Неверный формат электронной почты."}),
  partnerType: z.string({required_error: "Выберите тип контрагента."})
});

export const CreateCounterpartyModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createCounterparty";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await createCounterparty(
      values.name, 
      values.phoneNumber, 
      values.email, 
      values.partnerType as PartnerType
    );

    dispatch(addCounterparty(response.data));

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
          <DialogTitle>Добавьте контрагента</DialogTitle>
          <DialogDescription>Введите данные нового контрагента.</DialogDescription>
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
