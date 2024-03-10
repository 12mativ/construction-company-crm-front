"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { getOrders } from "@/http/orders/ordersAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import { OrderType, addOrders } from "@/lib/features/orders/ordersSlice";
import { formateComplexDate } from "@/lib/utils";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../errorAlert";

const ProjectOrdersJournal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([])
  const [orderType, setOrderType] = useState<OrderType>("PAID");
  const orders = useAppSelector((state) => state.ordersReducer.orders);
	const sortedOrders = orders.slice().sort((a, b) => {
		const dateA = new Date(a.factPaymentDate);
		const dateB = new Date(b.factPaymentDate);

		return dateB.getTime() - dateA.getTime();
	})
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
        setErrors(prevState => [...prevState, "Произошла ошибка при загрузке контрагентов."])
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
      {errors.length !== 0 && errors.map((error, index) => <ErrorAlert key={index} error={error} />)}
      <Table>
        <TableHeader>
          <TableRow key="orderHeader">
            <TableHead className="flex-1 px-4">Заказ</TableHead>
            <TableHead className="w-[150px] text-center">Дата</TableHead>
            <TableHead className="w-[150px] text-center">Сумма</TableHead>
            <TableHead className="w-[150px] text-center">Контрагент</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {sortedOrders.map((order) => (
        <div
          className="flex w-full items-center"
          key={order.id}
        >
          <div className="flex-1 px-4">{order.description}</div>
					<div className="w-[150px] text-center px-2">
            {formateComplexDate(order.factPaymentDate)}
          </div>
					<div className="w-[150px] text-center px-2">
            {order.totalCost} ₽
          </div>
          <div className="w-[150px] text-center px-2">
            {
              counterparties.find(
                (counterparty) => counterparty.id === order.partnerId
              )?.name
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOrdersJournal;
