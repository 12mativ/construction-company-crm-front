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
import { createProject } from "@/http/projects/projectsAPI";
import { addProject } from "@/lib/features/projects/projectsSlice";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const formSchema = z.object({
  projectName: z
    .string()
    .min(1, {
      message: "Название проекта обязательно.",
    })
    .max(50, {
      message: "Название проекта не должно превышать 50 символов.",
    }),
});

export const CreateProjectModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "createProject";

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createProject(values.projectName);

      dispatch(addProject(response.data));

      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при создании проекта.");
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
          <DialogTitle>Создайте проект</DialogTitle>
          <DialogDescription>Введите данные нового проекта.</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название проекта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название проекта..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isLoading}
                type="submit"
                className="hover:bg-red-600"
              >
                Создать
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
