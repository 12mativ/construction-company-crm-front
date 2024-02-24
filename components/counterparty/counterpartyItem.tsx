import { Table, TableCell, TableRow, TableBody } from "../ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ICounterparty } from "@/lib/features/counterparties/counterpartiesSlice";
import { PartnerType } from "@/lib/features/counterparties/counterpartiesSlice";

// interface CounterpartyItemProps {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   partnerType: PartnerType;
// }

// const CounterpartyItem = ({
//   name,
//   phoneNumber,
//   email,
//   partnerType,
// }: CounterpartyItemProps) => {


const CounterpartyItem = ({ id, name, phoneNumber, email, partnerType,}: ICounterparty) => {
  const { onOpen } = useModal();
  return (
    <TableRow className='group transition text-[16px]'>
      <TableCell className="flex-1 font-semibold">{name}</TableCell>
      <TableCell className="flex-2 w-[165px] text-center px-1">
        {phoneNumber}
      </TableCell>
      <TableCell className="flex-2 w-[165px] text-center px-1">
        {email}
      </TableCell>
      <TableCell className="flex-2 w-[167px] text-center px-1">
        {partnerType === "LEGAL" ? "Юр. лицо" : "Физ. лицо"}
      </TableCell>
      <TableCell className="flex ">
        <Pencil
          onClick={() =>
            onOpen("editCounterparty", {
              partnerId: id,
              counterpartyName: name,
              phoneNumber: phoneNumber,
              email: email,
              partnerType: partnerType,
            })
          }
          className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
            p-1 text-neutral-500 transition"
        />
        <Trash2
          onClick={() =>
            onOpen("deleteCounterparty", {
              partnerId: id,
              counterpartyName: name,
            })
          }
          className="w-8 h-8 opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
        p-1 text-red-400 transition"
        />
      </TableCell>      
    </TableRow>
  );
};

export default CounterpartyItem;
