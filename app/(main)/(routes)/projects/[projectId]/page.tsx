import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Page = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="w-[30%] px-4">Ресурсы и работа</TableHead>
            <TableHead className='text-center px-4'>Подрядчик</TableHead>
            <TableHead className="text-center px-4">Кол-во</TableHead>
            <TableHead className="text-center px-4">Ед. изм.</TableHead>
            <TableHead className="text-center px-4">Цена, ед.</TableHead>
            <TableHead className="text-center px-4">Себестоимость</TableHead>
            <TableHead className="text-center px-4">Наценка</TableHead>
            <TableHead className="text-center px-4">Цена для заказчика</TableHead>
            <TableHead className="text-center px-4">Стоим. для заказчика</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <div className="bg-neutral-200 rounded-lg p-3 shadow-xl my-5">
        <p className="text-neutral-500 text-xl font-bold">Название проекта</p>
      </div>

      <Table>
        <TableBody>
          <TableRow key="settingsHeader">
            <TableCell className="w-[30%] px-4">Ресурсы и работа</TableCell>
            <TableCell className='text-center px-4'>Подрядчик</TableCell>
            <TableCell className="text-center px-4">Кол-во</TableCell>
            <TableCell className="text-center px-4">Ед. изм.</TableCell>
            <TableCell className="text-center px-4">Цена, ед.</TableCell>
            <TableCell className="text-center px-4">Себестоимость</TableCell>
            <TableCell className="text-center px-4">Наценка</TableCell>
            <TableCell className="text-center px-4">Цена для заказчика</TableCell>
            <TableCell className="text-center px-4">Стоим. для заказчика</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      check
    </div>
  )
}

export default Page;