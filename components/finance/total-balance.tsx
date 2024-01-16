import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "Расчетный счет",
    companyName: "Союз ",
    moneyAmount: "200 000 Р",
  },
  {
    invoice: "Новый счет",
    companyName: "Союз ",
    moneyAmount: "100 000 Р",
  },
  {
    invoice: "Касса",
    companyName: "ИП Воробьев  ",
    moneyAmount: "200 000 Р",
  },
];

const TotalBalance = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Table>
        <TableBody>
          <TableRow key="totalAmount">
            <TableCell className="font-bold text-2xl">Общий баланс</TableCell>
            <TableCell></TableCell>
            <TableCell className="font-bold text-2xl text-right">
              500 000 Р
            </TableCell>
          </TableRow>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="w-[33%] font-bold">{invoice.invoice}</TableCell>
              <TableCell className='w-[33%] text-center'>{invoice.companyName}</TableCell>
              <TableCell className="w-[33%] text-right">
                {invoice.moneyAmount} 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TotalBalance;
