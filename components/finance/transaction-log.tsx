"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/redux-hooks";
import AddButton from "../addButton";
import TransactionItem from "./transaction-item";

const TransactionLog = () => {
  const { transfers, outcomes, incomes } = useAppSelector(
    (state) => state.transactionsReducer
  );

  const allTransactions = [...transfers, ...outcomes, ...incomes].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    }
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="text-neutral-400 px-10 text-[16px]">
            <TableHead className="w-[33%]">Дата</TableHead>
            <TableHead className="w-[33%] text-center">
              Операция
            </TableHead>
            <TableHead className="w-[33%] text-right">
              Сумма
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              date={transaction.date}
              amount={transaction.amount}
              description={transaction.description}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-y-4 items-end justify-end lg:gap-x-2 lg:flex-row mt-8">
        <AddButton buttonText="Доход" modalName="createIncome" />
        <AddButton buttonText="Расход" modalName="createOutcome" />
        <AddButton buttonText="Перевод" modalName="createTransfer" />
      </div>
    </div>
  );
};

export default TransactionLog;
