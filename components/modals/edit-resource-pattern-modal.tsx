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
import { updateResourcePattern } from "@/http/resources/resourcesAPI";
import { editResourcePattern } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { useEffect } from "react";

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

export const EditResourcePatternModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editResourcePattern";

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
    const response = await updateResourcePattern({
      resourcePatternId: data.resourcePattern!.resourcePatternId,
      resourcePatternName: values.name,
      costPricePerUnit: values.costPricePerUnit,
      orderPricePerUnit: values.orderPricePerUnit,
      extraCharge: calculateExtraCharge(),
      measureUnit: values.measureUnit,
      resourceType: data.resourceType!,
    });

    dispatch(editResourcePattern(response.data));
    handleClose();
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

  useEffect(() => {
    const currentResourcePattern = data.resourcePattern;
    if (currentResourcePattern) {
      if (currentResourcePattern.resourcePatternName) {
        form.setValue("name", currentResourcePattern.resourcePatternName);
      }
      if (currentResourcePattern.resourcePatternCostPricePerUnit) {
        form.setValue(
          "costPricePerUnit",
          currentResourcePattern.resourcePatternCostPricePerUnit
        );
      }
      if (currentResourcePattern.resourcePatternOrderPricePerUnit) {
        form.setValue(
          "orderPricePerUnit",
          currentResourcePattern.resourcePatternOrderPricePerUnit
        );
      }
      if (currentResourcePattern.resourcePatternMeasureUnit) {
        form.setValue(
          "measureUnit",
          currentResourcePattern.resourcePatternMeasureUnit
        );
      }
    }
  }, [form, data.resourcePattern, isOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Измените ресурс</DialogTitle>
          <DialogDescription>Введите данные ресурса.</DialogDescription>
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
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
