import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    date: "11/1/2023",
    transaction: "Зачисление от заказчика",
    moneyAmount: "+ 200 000 Р",
  },
  {
    date: "11/1/2023",
    transaction: "Покупка материалов",
    moneyAmount: "- 100 000 Р",
  },
  {
    date: "11/1/2023",
    transaction: "Перевод",
    moneyAmount: "200 000 Р",
  },
];

const TransactionLog = () => {
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.date}>
              <TableCell className="w-[33%]">{transaction.date}</TableCell>
              <TableCell className="w-[33%] text-center">
                {transaction.transaction}
              </TableCell>
              <TableCell className="w-[33%] text-right font-bold">
                {transaction.moneyAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionLog;
