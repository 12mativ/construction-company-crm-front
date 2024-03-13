"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { getOrders } from "@/http/orders/ordersAPI";
import { getOrganisations } from "@/http/organisations/organisationsAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import { OrderType, addOrders } from "@/lib/features/orders/ordersSlice";
import { addOrganisations } from "@/lib/features/organisations/organisationsSlice";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../errorAlert";
import { formateComplexDate } from "@/lib/utils";

const ProjectOrdersNeedToPay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("NOT_PAID");
	const {onOpen} = useModal();
  const orders = useAppSelector((state) => state.ordersReducer.orders);
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
    getOrganisations().then((res) => {
      dispatch(addOrganisations(res.data));
    }).catch((error: AxiosError | any) => {
      setErrors(prevState => [...prevState, "Произошла ошибка при загрузке организаций."])
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
            <TableHead className="w-[150px] text-center">Позиций</TableHead>
            <TableHead className="w-[150px] text-center">План</TableHead>
            <TableHead className="w-[150px] text-center">Факт</TableHead>
            <TableHead className="w-[150px] text-center">Экономия</TableHead>
            <TableHead className="w-[150px] text-center">Статус</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {orders.map((order) => (
        <div 
					className="flex w-full items-center p-1 pl-0 rounded-lg hover:bg-neutral-100 cursor-pointer transition" 
					key={order.id}
					onClick={() => onOpen("createOrderPayment", {order: order})}
				>
          <div className="flex-1 px-4 py-2">{order.description}</div>
          <div className="w-[150px] text-center px-4">
            {
              counterparties.find(
                (counterparty) => counterparty.id === order.partnerId
              )?.name
            }
          </div>
          <div className="w-[150px] text-center px-4">{order.queryEntityList.length}</div>
          <div className="w-[150px] text-center px-4">{order.costPrice} ₽</div>
          <div className="w-[150px] text-center px-4">{order.factCostPrice} ₽</div>
          <div className="w-[150px] text-center px-4">{order.profit} ₽</div>
          <div
            className="w-[150px] text-center p-2 bg-yellow-200 text-orange-500 rounded-lg"
          >
            До {formateComplexDate(order.paymentDate)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOrdersNeedToPay;
