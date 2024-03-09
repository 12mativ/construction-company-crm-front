"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import { useEffect } from "react";
import AddButton from "../addButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import CounterpartyItem from "./counterpartyItem";

const Counterparties = () => {
  const dispatch = useAppDispatch();
  const counterparties = useAppSelector(
    (state) => state.counterpartiesReducer.counterparties
  );

  useEffect(() => {
    getCounterparties().then((res) => {
      dispatch(addCounterparties(res.data));
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow key="mainHeader" className="text-neutral-400 px-10 text-[16px]">
            <TableHead className="flex-1">Компания</TableHead>
            <TableHead className="flex-2 w-[165px] text-center px-1">
              Телефон
            </TableHead>
            <TableHead className="flex-2 w-[165px] text-center px-1">
              Почта
            </TableHead>
            <TableHead className="flex-2 w-[167px] text-center px-1">
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
