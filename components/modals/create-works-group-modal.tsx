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
import { createWorkGroup } from "@/http/works-groups/worksGroupsAPI";
import { addWorksGroup } from "@/lib/features/works-groups/worksGroupsSlice";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, {
      message: "Название ресурса обязательно.",
    })
    .max(50, {
      message: "Название ресурса не должно превышать 50 символов.",
    }),
});

export const CreateWorkGroupModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "createWorkGroup";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let nextNumber = 1;
      if (data.workGroups!.length > 0) {
        nextNumber = data.workGroups![data.workGroups!.length - 1].number + 1;
      }

      const response = await createWorkGroup(
        +data.projectId!,
        values.name,
        nextNumber
      );

      dispatch(
        addWorksGroup({
          id: response.data.id,
          name: response.data.name,
          number: response.data.number,
          workEntityList: [],
        })
      );
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при создании группы работ.");
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
          <DialogTitle>Создайте группу работ</DialogTitle>
          <DialogDescription>
            Введите данные новой группы работ.
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
                  <FormLabel>Название группы</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название группы..."
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
