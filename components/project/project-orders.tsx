"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getOrders } from "@/http/orders/ordersAPI";
import { OrderType, addOrders } from "@/lib/features/orders/ordersSlice";
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
          <TableRow key="projectHeader">
            <TableHead className="w-[18%] px-4">Заказ</TableHead>
            <TableHead className="flex-1 w-[140px]">Поставщик</TableHead>
            <TableHead className="w-[140px]">Срок оплаты</TableHead>
            <TableHead className="w-[140px]">Позиций</TableHead>
            <TableHead className="w-[140px]">План</TableHead>
            <TableHead className="w-[140px]">Факт</TableHead>
            <TableHead className="w-[140px]">Экономия</TableHead>
            <TableHead className="w-[140px]">Статус</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {orders.map((order) => (
        <div className="flex">
          <div className="w-[18%] px-4">1231</div>
          <div className="w-[140px]">
            {
              counterparties.find(
                (counterparty) => counterparty.id === order.projectId
              )?.name
            }
          </div>
          <div className="w-[140px]">{orders.length}</div>
          <div className="w-[140px]">==123123</div>
          <div className="w-[140px]">==123123</div>
          <div className="w-[140px]">===234234</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOrders;
