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
import { createResourcePattern } from "@/http/resources/resourcesAPI";
import { addResourcePattern } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
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
  costPricePerUnit: z.coerce
    .number({
      required_error: "Обязательно для заполнения.",
      invalid_type_error: "Введите числовое значение.",
    })
    .nonnegative({ message: "Себестоимость не может быть отрицательной." }),
  orderPricePerUnit: z.coerce
    .number({
      required_error: "Обязательно для заполнения.",
      invalid_type_error: "Введите числовое значение.",
    })
    .nonnegative({ message: "Стоимость не может быть отрицательной." }),
  measureUnit: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, { message: "Название единицы измерения обязательно." })
    .max(50, {
      message: "Единица измерения не должна превышать 50 символов.",
    }),
});

export const CreateResourcePatternModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState("");

  const isModalOpen = isOpen && type === "createResourcePattern";

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      measureUnit: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createResourcePattern({
        name: values.name,
        costPricePerUnit: values.costPricePerUnit,
        orderPricePerUnit: values.orderPricePerUnit,
        extraCharge: calculateExtraCharge(),
        measureUnit: values.measureUnit,
        resourceType: data.resourceType!,
      });

      response.data.resourceType = data.resourceType;
      dispatch(addResourcePattern(response.data));
      handleClose();
    } catch (error: AxiosError | any) {
      setError("Произошла ошибка при создании ресурса.");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const watchFields = form.watch(["costPricePerUnit", "orderPricePerUnit"]);

  const calculateExtraCharge = () => {
    const costPricePerUnit = +watchFields[0] || 0;
    const orderPricePerUnit = +watchFields[1] || 0;

    if (costPricePerUnit > 0 && orderPricePerUnit > costPricePerUnit) {
      const extraCharge =
        ((orderPricePerUnit - costPricePerUnit) / costPricePerUnit) * 100;
      return +extraCharge.toFixed(2);
    }

    return 0;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Создайте ресурс</DialogTitle>
          <DialogDescription>Введите данные нового ресурса.</DialogDescription>
          {error && <ErrorAlert error={error} />}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название ресурса</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Название ресурса..."
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
              name="costPricePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Себестоимость за единицу</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Себестоимость за единицу..."
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
              name="orderPricePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Стоимость для заказчика за единицу</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Стоимость для заказчика за единицу..."
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
              name="measureUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Единица измерения</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Единица измерения..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-neutral-400">
              Процент наценки составляет{" "}
              <span className="font-semibold">{calculateExtraCharge()} %</span>
            </p>

            <DialogFooter>
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
