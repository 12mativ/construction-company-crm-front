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
import { updateWorksGroup } from "@/http/works-groups/worksGroupsAPI";
import { editWorksGroup } from "@/lib/features/works-groups/worksGroupsSlice";
import { useEffect } from "react";


const formSchema = z.object({
  name: z
    .string({required_error: "Обязательно для заполнения."})
    .min(1, {
      message: "Название ресурса обязательно.",
    })
    .max(50, {
      message: "Название ресурса не должно превышать 50 символов.",
    }),
});

export const EditWorkGroupModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editWorksGroup";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  useEffect(() => {
    if (data.worksGroup?.worksGroupName) {
      form.setValue("name", data.worksGroup.worksGroupName);
    }
  }, [form, data.organisationId, data.worksGroup?.worksGroupName, isOpen]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await updateWorksGroup({
      worksGroupId: data.worksGroup!.worksGroupId!,
      worksGroupName: values.name,
      worksGroupNumber: data.worksGroup!.worksGroupNumber!,
      projectId: +data.projectId!
    });

    const dataForEditWorksGroup = {
      works_group_id: response.data.id,
      worksGroupName: response.data.name,
    };
    dispatch(editWorksGroup(dataForEditWorksGroup));
    
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
          <DialogTitle>Редактирование группы работ</DialogTitle>
          <DialogDescription>Введите новые данные.</DialogDescription>
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
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
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
