"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { addProject } from "@/lib/features/projects/projectsSlice";

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
  const {isOpen, onClose, type} = useModal();

  const isModalOpen = isOpen && type === 'createProject';

  const router = useRouter();

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    axios.post(`http://localhost:8080/api/v1/projects`, {name: values.projectName})
      .then(res => {
        dispatch(addProject(res.data))
      })
  }; 

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className='flex flex-col gap-y-2'>
          <DialogTitle>Создайте проект</DialogTitle>
          <DialogDescription>
            Введите данные нового проекта.
          </DialogDescription>
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
              <Button disabled={isLoading} type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
  );
};
