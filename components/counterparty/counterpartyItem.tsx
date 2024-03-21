import { useModal } from "@/hooks/use-modal-store";
import { ICounterparty } from "@/lib/features/counterparties/counterpartiesSlice";
import { Pencil, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

const CounterpartyItem = ({ id, name, phoneNumber, email, partnerType,}: ICounterparty) => {
  const { onOpen } = useModal();
  return (
    <TableRow className='group transition text-[12px] lg:text-[16px]'>
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
      <TableCell className="flex-3 w-[10px]">
        <div className="flex gap-x-4 lg:gap-x-2">
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
            className="w-8 h-8 opacity-100 lg:opacity-0  group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
              p-1 text-neutral-500 transition"
          />
          <Trash2
            onClick={() =>
              onOpen("deleteCounterparty", {
                partnerId: id,
                counterpartyName: name,
              })
            }
            className="w-8 h-8 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
          p-1 text-red-400 transition"
          />
        </div>
      </TableCell>      
    </TableRow>
  );
};

export default CounterpartyItem;
