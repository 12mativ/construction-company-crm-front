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

const orderSchema = z.object({
  factQuantity: z.coerce.number({
    invalid_type_error: "Введите числовое значение",
  }),
  factCostPerUnit: z.coerce.number({
    invalid_type_error: "Введите числовое значение",
  }),
});

const formSchema = z.object({
  orders: z.record(orderSchema),
});

export const CreateOrderModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { orders } = data;

  const isModalOpen = isOpen && type === "createOrder";

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orders: orders?.reduce((acc, order) => {
        acc[order.id] = {
          factQuantity: order.factQuantity,
          factCostPerUnit: order.factCostPerUnit,
        };
        return acc;
      }, {} as Record<string, { factQuantity: number; factCostPerUnit: number }>),
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("here");
    console.log(values.orders);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Создать заказ</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {/* 
            // @ts-ignore */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {orders?.map((order) => (
              <div key={order.id}>
                <FormField
                  control={form.control}
                  name={`orders.${order.id}.factQuantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите количество..."
                          disabled={isLoading}
                          defaultValue={order.factQuantity}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`orders.${order.id}.factCostPerUnit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите количество..."
                          disabled={isLoading}
                          defaultValue={order.factCostPerUnit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

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
