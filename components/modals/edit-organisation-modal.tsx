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
import { updateOrganisation } from "@/http/organisations/organisationsAPI";
import { editOrganisation } from "@/lib/features/organisations/organisationsSlice";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, {
      message: "Обязательно для заполнения.",
    })
    .max(50, {
      message: "Название организации не должно превышать 50 символов.",
    }),
});

export const EditOrganisationModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "editOrganisation";
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.organisationName || "",
    },
  });

  useEffect(() => {
    if (data.organisationName) {
      form.setValue("name", data.organisationName);
    }
  }, [form, data.organisationId, data.organisationName, isOpen]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateOrganisation({
        organisationId: data.organisationId!,
        organisationName: values.name,
      });

      const dataForEditOrganisation = {
        organisationId: response.data.id,
        organisationName: response.data.name,
      };
      dispatch(editOrganisation(dataForEditOrganisation));

      form.reset();
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при редактировании организации.");
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
          <DialogTitle>Редактрирование организации</DialogTitle>
          <DialogDescription>
            Введите новые данные организации.
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
                  <FormLabel>Название организации</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название организации..."
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
