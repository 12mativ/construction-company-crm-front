"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { updateResource } from "@/http/resources/resourcesAPI";
import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { addWorksGroups, editResource } from "@/lib/features/works-groups/worksGroupsSlice";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z
    .string({ required_error: "Обязательно для заполнения." })
    .min(1, {
      message: "Название ресурса обязательно.",
    })
    .max(50, {
      message: "Название ресурса не должно превышать 50 символов.",
    }),
  resourceType: z.string({ required_error: "Выберите тип ресурса." }),
  quantity: z.coerce
    .number({
      required_error: "Обязательно для заполнения.",
      invalid_type_error: "Введите числовое значение.",
    })
    .positive({ message: "Количество должно быть положительным." }),
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

export const EditResourceModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editResource";
  const { projectId } = useParams<{ projectId: string }>();

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const currentWork = data.work!;
    const response = await updateResource({
      resourceId: data.resource!.id,
      workId: currentWork.id,
      name: values.name,
      costPricePerUnit: values.costPricePerUnit,
      orderPricePerUnit: values.orderPricePerUnit,
      extraCharge: calculateExtraCharge(),
      measureUnit: values.measureUnit,
      quantity: values.quantity,
      resourceType: values.resourceType as ResourceType,
    });

    dispatch(editResource(response.data));
    getWorksGroups(projectId)
      .then((res) => {
        dispatch(addWorksGroups(res.data));
      })
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
    if (data.resource) {
      form.setValue("name", data.resource.name);
      form.setValue("resourceType", data.resource.resourceType);
      form.setValue("quantity", data.resource.quantity);
      form.setValue("costPricePerUnit", data.resource.costPricePerUnit);
      form.setValue("orderPricePerUnit", data.resource.orderPricePerUnit);
      form.setValue("measureUnit", data.resource.measureUnit);
    }
  }, [form, data.resource, isOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Изменение ресурса</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="columns-2 pt-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5 mr-5">
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
                name="resourceType"
                render={({ field }) => (
                  <FormItem className="mb-5 mr-5 ">
                    <FormLabel>Тип ресурса</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип ресурса" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HUMAN">
                          <p>Рабочие</p>
                        </SelectItem>
                        <SelectItem value="MECHANICAL">Механизмы</SelectItem>
                        <SelectItem value="MATERIAL">Материалы</SelectItem>
                        <SelectItem value="INVOICES">Накладные</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="mb-5 mr-5">
                    <FormLabel>Количество</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Количество..."
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
                  <FormItem className="mb-5 mr-5">
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
                  <FormItem className="mb-5 mr-5">
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
                  <FormItem className="mr-5">
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
            </div>

            <div className="flex justify-between pt-8 ">
              <p className="text-neutral-400">
                Процент наценки составляет{" "}
                <span className="font-semibold">
                  {calculateExtraCharge()} %
                </span>
              </p>

              <DialogFooter>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="hover:bg-red-600"
                >
                  Обновить
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
