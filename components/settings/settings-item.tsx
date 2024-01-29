import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IOrganisation } from "@/lib/features/organisations/organisationsSlice";

const SettingsItem = ({ name, moneyAccountList }: IOrganisation) => {
  return (
    <>
      <div className="bg-neutral-200 rounded-lg p-4 pl-10 shadow-xl">
        <p className="text-neutral-600 text-xl font-semibold">{name}</p>
      </div>
      <Table>
        <TableBody>
          {moneyAccountList.map((moneyAccount) => (
            <TableRow
              key={moneyAccount.id}
              className="flex items-center text-[16px]"
            >
              <TableCell className="w-[33%] px-10">
                {moneyAccount.name}
              </TableCell>
              <TableCell className="w-[33%] text-center px-10">
                {moneyAccount.numberOfAccount}
              </TableCell>
              <TableCell className="w-[33%] text-right px-10">
                {moneyAccount.balance} ₽
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SettingsItem;
