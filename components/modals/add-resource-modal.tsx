"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { updateWork } from "@/http/works-groups/worksAPI";
import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { addResourceToWork } from "@/lib/features/works-groups/worksGroupsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useState } from "react";
import ResourcesTable from "../project/resource-table";

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

export const AddResourceModal = () => {
  const [isChoosingFromCatalog, setIsChoosingFromCatalog] = useState(false);

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "addResourceModal";

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
    const currentWork = data.work!;
    const response = await updateWork({
      workId: currentWork.id,
      name: currentWork.name,
      number: currentWork.number,
      quantity: currentWork.quantity,
      measureUnit: currentWork.measureUnit,
      startDate: currentWork.startDate,
      endDate: currentWork.endDate,
      worksGroupId: currentWork.worksGroupId,
      resourceEntityList: [
        ...currentWork.resourceEntityList,
        {
          name: values.name,
          measureUnit: values.measureUnit,
          quantity: values.quantity,
          costPricePerUnit: values.costPricePerUnit,
          orderPricePerUnit: values.orderPricePerUnit,
          extraCharge: calculateExtraCharge(),
          resourceType: values.resourceType as ResourceType,
        },
      ],
    });

    dispatch(addResourceToWork(response.data));
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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex justify-center w-2/5 h-2/3">
        {isChoosingFromCatalog ? (
          <>
            <DialogHeader className="m-auto items-center">
              <DialogTitle>Выберите необходимые ресурсы</DialogTitle>
              <DialogDescription>
                Или{" "}
                <button
                  className="text-red-600"
                  onClick={() => setIsChoosingFromCatalog(false)}
                >
                  введите данные ресурса вручную
                </button>
              </DialogDescription>
            </DialogHeader>
            <ResourcesTable />
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <div>
                <DialogHeader>
                  <DialogTitle>Создайте ресурс</DialogTitle>
                  <DialogDescription>
                    Введите данные нового ресурса. Или{" "}
                    <button
                      className="text-red-600 underline"
                      onClick={() => setIsChoosingFromCatalog(true)}
                    >
                      выберите ресурсы из справочника
                    </button>
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 flex h-2/4 flex-wrap flex-col justify-center"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className=" mr-5 mt-8">
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
                        <FormItem className=" mr-5 ">
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
                              <SelectItem
                                value="HUMAN"
                                className="flex items-center group gap-x-2 p-6"
                              >
                                <p>Рабочие</p>
                              </SelectItem>
                              <SelectItem value="MECHANICAL">
                                Механизмы
                              </SelectItem>
                              <SelectItem value="MATERIAL">
                                Материалы
                              </SelectItem>
                              <SelectItem value="INVOICES">
                                Накладные
                              </SelectItem>
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
                        <FormItem className=" mr-5 ">
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
                        <FormItem className=" mr-5">
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
                        <FormItem className=" mr-5">
                          <FormLabel>
                            Стоимость для заказчика за единицу
                          </FormLabel>
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
                        <FormItem className=" mr-5">
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
                  </form>
                </Form>
                <div>
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
                      Создать
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
