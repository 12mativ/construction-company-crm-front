import { TableCell, TableRow } from "../ui/table";

const stringToProperDateFormat = (date: string) => {
  const dateArr = date.split('-');
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
} 

const TransactionItem = ({
  date,
  amount, 
  description
}: {
  date: string
  amount: number
  description: string
}) => {
  return (
    <TableRow key={date} className="text-[16px]">
      <TableCell className="w-[33%]">{stringToProperDateFormat(date)}</TableCell>
      <TableCell className="w-[33%] text-center">{description}</TableCell>
      <TableCell className="w-[33%] text-right font-bold">{amount} ₽</TableCell>
    </TableRow>
  );
};

export default TransactionItem;
