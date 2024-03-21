"use client";

import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { getOrders } from "@/http/orders/ordersAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import { OrderType, addOrders } from "@/lib/features/orders/ordersSlice";
import { cn, formateComplexDate } from "@/lib/utils";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../errorAlert";

const ProjectOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const orders = useAppSelector((state) => state.ordersReducer.orders);
  const [orderType, setOrderType] = useState<OrderType>("NOT_PAID");
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getOrders(+projectId, orderType).then((res) => {
      dispatch(addOrders(res.data));
    }).catch((error: AxiosError | any) => {
      setErrors(prevState => [...prevState, "Произошла ошибка при загрузке заказов."])
    });
    getCounterparties()
      .then((res) => {
        dispatch(addCounterparties(res.data));
      }).catch((error: AxiosError | any) => {
        setErrors(prevState => [...prevState, "Произошла ошибка при загрузке поставщиков."])
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
      {errors.length !== 0 && errors.map((error, index) => <ErrorAlert key={index} error={error} />)}
      <Table>
        <TableHeader>
          <TableRow key="orderHeader">
            <TableHead className="flex-1 px-4">Заказ</TableHead>
            <TableHead className="w-[150px] text-center">Поставщик</TableHead>
            <TableHead className="w-[150px] text-center">Срок оплаты</TableHead>
            <TableHead className="w-[150px] text-center">Позиций</TableHead>
            <TableHead className="w-[150px] text-center">План</TableHead>
            <TableHead className="w-[150px] text-center">Факт</TableHead>
            <TableHead className="w-[150px] text-center">Экономия</TableHead>
            <TableHead className="w-[150px] text-center">Статус</TableHead>
          </TableRow>
        </TableHeader>
      </Table>


      {orders.map((order) => (
        <Table>
          <TableBody>
            <TableRow className="flex items-center" key={order.id}>
              <TableCell className="flex-1 w-[30%] px-4 p-2">1231</TableCell>
              <TableCell className=" w-[20%] text-right p-2">
                {
                  counterparties.find(
                    (counterparty) => counterparty.id === order.partnerId
                  )?.name
                }
              </TableCell>
              <TableCell className=" w-[12%] text-center p-2">{formateComplexDate(order.paymentDate)}</TableCell>
              <TableCell className=" w-[11%] text-center p-2">{order.queryEntityList.length}</TableCell>
              <TableCell className=" w-[10%] text-center p-2">{order.costPrice} ₽</TableCell>
              <TableCell className=" w-[10%] text-center p-2">{order.factCostPrice} ₽</TableCell>
              <TableCell className=" w-[10%] text-center p-2">{order.profit} ₽</TableCell>
              <TableCell
                className={cn(
                  "w-[100px] lg:w-[150px] text-center p-2 rounded-lg",
                  order.orderType === "NOT_PAID"
                    ? "bg-yellow-200 text-orange-500"
                    : "bg-emerald-200 text-emerald-500"
                )}
              >
                {order.orderType === "NOT_PAID" ? (
                  <p>Ожидается оплата</p>
                ) : (
                  <p>Оплачено</p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        
      ))}
    </div>
  );
};

export default ProjectOrders;
