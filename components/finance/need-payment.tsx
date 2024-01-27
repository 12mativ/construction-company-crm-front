import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NeedPayment = () => {
  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%] font-semibold">Дата поступления</TableHead>
            <TableHead className="w-[20%] text-center font-semibold">
              Сумма
            </TableHead>
            <TableHead className="w-[20%] text-center font-semibold">
              Контрагент
            </TableHead>
            <TableHead className="w-[20%] text-right font-semibold">
              Срок выплаты
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {transactions.map((transaction) => (
            <TableRow key={transaction.date}>
              <TableCell className="w-[33%]">{transaction.date}</TableCell>
              <TableCell className="w-[33%] text-center">
                {transaction.transaction}
              </TableCell>
              <TableCell className="w-[33%] text-right font-bold">
                {transaction.moneyAmount}
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
  )
}

export default NeedPayment;