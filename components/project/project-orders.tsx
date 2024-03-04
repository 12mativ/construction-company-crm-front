"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getOrders } from "@/http/orders/ordersAPI";
import { OrderType, addOrders } from "@/lib/features/orders/ordersSlice";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectOrders = () => {
  const orders = useAppSelector((state) => state.ordersReducer.orders);
  const [orderType, setOrderType] = useState<OrderType>("NOT_PAID");
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getOrders(+projectId, orderType).then((res) => {
      dispatch(addOrders(res.data));
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
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
        <div className="flex w-full items-center" key={order.id}>
          <div className="flex-1 px-4 p-2">1231</div>
          <div className="w-[150px] text-center p-2">
            {
              counterparties.find(
                (counterparty) => counterparty.id === order.partnerId
              )?.name
            }
          </div>
          <div className="w-[150px] text-center p-2">Дата</div>
          <div className="w-[150px] text-center p-2">{orders.length}</div>
          <div className="w-[150px] text-center p-2">План ₽</div>
          <div className="w-[150px] text-center p-2">Факт ₽</div>
          <div className="w-[150px] text-center p-2">Экономия</div>
          <div
            className={cn(
              "w-[150px] text-center p-2 rounded-lg",
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOrders;
