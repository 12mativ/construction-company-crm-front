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
import { addUserToProject } from "@/http/users/usersAPI";
import { addUser } from "@/lib/features/users/usersSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Неверный формат электронной почты" }),
});

export const AddUserToProjectModal = () => {
  const [error, setError] = useState("");

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "addUserToProject";

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await addUserToProject({
        projectId: +data.projectId!,
        email: values.email,
      });

      dispatch(addUser(response.data));

      handleClose();
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
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
          <DialogTitle>Добавить сотрудника</DialogTitle>
          <DialogDescription>Добавить сотрудника в проект.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Введите email..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}

            <DialogFooter>
              <Button
                disabled={isLoading}
                type="submit"
                className="hover:bg-red-600"
              >
                Добавить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
