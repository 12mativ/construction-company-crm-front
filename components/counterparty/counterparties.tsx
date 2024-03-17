"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import { useEffect, useState } from "react";
import AddButton from "../addButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CounterpartyItem from "./counterpartyItem";
import LoaderIndicator from "../loader";
import { AxiosError } from "axios";
import { ErrorAlert } from "../errorAlert";

const Counterparties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );

  useEffect(() => {
    getCounterparties()
      .then((res) => {
        dispatch(addCounterparties(res.data));
      })
      .catch((error: AxiosError | any) => {
        setError("Произошла ошибка при загрузке контрагентов.");
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      {error && <ErrorAlert error={error} />}
      <Table>
        <TableHeader>
          <TableRow
            key="mainHeader"
            className="text-neutral-400 px-10 text-[16px]"
          >
            <TableHead className="flex-1">Компания</TableHead>
            <TableHead className="flex-2 w-[32%] text-center px-2">
              Телефон
            </TableHead>
            <TableHead className="flex-2 w-[32%] text-center px-2">
              Почта
            </TableHead>
            <TableHead className="flex-2 w-[36%] text-center px-2">
              Тип
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="pt-10">
          {counterparties.map((counterparty) => (
            <CounterpartyItem key={counterparty.id} {...counterparty} />
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end mt-8">
        <AddButton buttonText="Контрагент" modalName="createCounterparty" />
      </div>
    </div>
  );
};

export default Counterparties;
