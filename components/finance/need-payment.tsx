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
          <TableRow className="text-neutral-400 px-10 text-[16px]">
            <TableHead className="w-[20%]">Дата поступления</TableHead>
            <TableHead className="w-[20%] text-center">
              Сумма
            </TableHead>
            <TableHead className=" w-[20%] text-center">
              Контрагент
            </TableHead>
            <TableHead className="w-[20%] text-right">
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