import { formateComplexDate } from "@/lib/utils";
import { TableCell, TableRow } from "../ui/table";

const TransactionItem = ({
  date,
  amount,
  description,
}: {
  date: string;
  amount: number;
  description: string;
}) => {
  return (
    <TableRow key={date} className="text-[16px]">
      <TableCell className="w-[33%]">{formateComplexDate(date)}</TableCell>
      <TableCell className="w-[33%] text-center">{description}</TableCell>
      <TableCell className="w-[33%] text-right font-bold">{amount} ₽</TableCell>
    </TableRow>
  );
};

export default TransactionItem;
