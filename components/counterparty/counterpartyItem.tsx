import { PartnerType } from "@/lib/features/counterparty/counterpartiesSlice";
import {
  TableCell,
  TableRow
} from "../ui/table";

interface CounterpartyItemProps {
  name: string
  phoneNumber: string
  email: string
  partnerType: PartnerType
}

const CounterpartyItem = ({
  name,
  phoneNumber,
  email,
  partnerType
}: CounterpartyItemProps) => {
  return (
    <TableRow>
      <TableCell className="flex-1 font-semibold">{name}</TableCell>
      <TableCell className="flex-2 w-[165px] text-center px-1">
        {phoneNumber}
      </TableCell>
      <TableCell className="flex-2 w-[165px] text-center px-1">
        {email}
      </TableCell>
      <TableCell className="flex-2 w-[167px] text-center px-1">
        {partnerType === "LEGAL" ? 'Юр. лицо' : 'Физ. лицо'}
      </TableCell>
    </TableRow>
  );
};

export default CounterpartyItem;
