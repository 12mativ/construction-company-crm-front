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
          <TableRow>
            <TableHead className="w-[33%] font-semibold">Дата</TableHead>
            <TableHead className="w-[33%] text-center font-semibold">
              Операция
            </TableHead>
            <TableHead className="w-[33%] text-right font-semibold">
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
      <div className="flex justify-end gap-x-2 mt-8">
        <AddButton buttonText="Доход" modalName="createIncome" />
        <AddButton buttonText="Расход" modalName="createOutcome" />
        <AddButton buttonText="Перевод" modalName="createTransfer" />
      </div>
    </div>
  );
};

export default TransactionLog;
