"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addCounterparties } from "@/lib/features/counterparty/counterpartiesSlice";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import CounterpartyItem from "./counterpartyItem";

const Counterparties = () => {
  const dispatch = useAppDispatch();
  const counterparties = useAppSelector((state) => state.counterpartiesReducer.counterparties);

  const { onOpen } = useModal();

  useEffect(() => {
    getCounterparties().then((res) => {
      dispatch(addCounterparties(res.data));
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow key="mainHeader">
            <TableHead className="flex-1 text-lg">Компания</TableHead>
            <TableHead className="flex-2 w-[165px] text-center px-1 text-lg">
              Телефон
            </TableHead>
            <TableHead className="flex-2 w-[165px] text-center px-1 text-lg">
              Почта
            </TableHead>
            <TableHead className="flex-2 w-[167px] text-center px-1 text-lg">
              Тип
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="pt-10">
          {counterparties.map((counterparty) => (
            <CounterpartyItem key={counterparty.id} {...counterparty} />
          ))}
          {/* <TableRow>
            <TableCell className="flex-1 font-semibold">Ресурсы</TableCell>
            <TableCell className="flex-2 w-[165px] text-center px-1">
              Цена, ед.
            </TableCell>
            <TableCell className="flex-2 w-[165px] text-center px-1">
              Наценка
            </TableCell>
            <TableCell className="flex-2 w-[167px] text-center px-1">
              Цена для заказчика
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end mt-8">
        <Button
          variant="ghost"
          className="flex items-center group gap-x-2"
          onClick={() => onOpen("createCounterparty")}
        >
          <p>Контрагент</p>
          <Plus
            className="bg-neutral-400 text-base text-neutral-600 group-hover:bg-red-500
            group-hover:text-neutral-100 rounded-full p-1 transition"
            size={30}
          />
        </Button>
      </div>
    </div>
  );
};

export default Counterparties;
