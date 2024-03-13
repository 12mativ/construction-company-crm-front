"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import {
  getWorksProgress,
  updateWorkProgress,
} from "@/http/works-progress/worksProgressAPI";
import {
  addWorkProgress,
  addWorksProgress,
} from "@/lib/features/works-progress/worksProgressSlice";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Progress } from "../ui/progress";
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

export const UpdateWorkProgressModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const formSchema = z.object({
    quantity: z.coerce
      .number({
        required_error: "Обязательно для заполнения.",
        invalid_type_error: "Введите числовое значение.",
      })
      .lte(data.work ? data.work.quantity : 0, {
        message: `Значение выполненной работы не может превышать ${data.work?.quantity} ${data.work?.measureUnit}`,
      })
      .positive({ message: "Количество должно быть положительным." }),
    timestamp: z.date({
      required_error: "Дата обязательна.",
    }),
  });

  const isModalOpen = isOpen && type === "updateWorkProgress";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedWorkProgress = await updateWorkProgress({
        quantityBefore: data.work!.doneQuantity,
        quantityAfter: data.work!.doneQuantity + values.quantity,
        timestamp: format(values.timestamp, "yyyy-MM-dd"),
        workId: data.work!.id,
      });

      const newWorksGroups = await getWorksGroups(data.projectId!);
      dispatch(addWorksGroups(newWorksGroups.data));

      dispatch(addWorkProgress(updatedWorkProgress.data));
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при обновлении прогресса работы.");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const watchFields = form.watch(["quantity"]);

  const calculateProgress = () => {
    if (data.work) {
      const progress =
        ((data.work.doneQuantity + (watchFields[0] ? +watchFields[0] : 0)) /
          data.work.quantity) *
        100;
      if (progress < 100) {
        return progress;
      } else {
        return 100;
      }
    }
    return 0;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>{data.work?.name}</DialogTitle>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>

        <div className="flex flex-col gap-y-2">
          <p className="text-neutral-400 text-sm">Прогресс работ</p>
          <div className="flex gap-x-2 items-center">
            <Progress value={calculateProgress()} />
            <span className="text-neutral-400">
              {calculateProgress().toFixed(2)}%
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="timestamp"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Дата выполнения работы</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd.MM.yyyy")
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={() => false}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mb-5 mr-5">
                  <FormLabel>Выполненное количество</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Количество..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-x-2">
              <Button
                onClick={handleClose}
                className="bg-red-500 hover:bg-red-400"
                disabled={isLoading}
                type="button"
              >
                Отмена
              </Button>
              <Button disabled={isLoading} type="submit">
                Создать
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
