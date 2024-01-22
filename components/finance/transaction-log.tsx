"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/redux-hooks";
import AddButton from "../addButton";
import TransactionItem from "./transactionItem";

const TransactionLog = () => {
  const { transfers, outcomes, incomes } = useAppSelector(
    (state) => state.transactionsReducer
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
          {transfers.map((transfer) => (
            <TransactionItem
              key={transfer.id}
              date={transfer.date}
              amount={transfer.amount}
              description={transfer.description}
            />
          ))}
          {outcomes.map((outcome) => (
            <TransactionItem
              key={outcome.id}
              date={outcome.date}
              amount={outcome.amount}
              description={outcome.description}
            />
          ))}
          {incomes.map((income) => (
            <TransactionItem
              key={income.id}
              date={income.date}
              amount={income.amount}
              description={income.description}
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
