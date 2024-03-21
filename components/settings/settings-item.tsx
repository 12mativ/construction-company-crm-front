"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal-store";
import { IOrganisation } from "@/lib/features/organisations/organisationsSlice";
import { Pencil, Trash2 } from "lucide-react";

const SettingsItem = ({ id, name, moneyAccountList }: IOrganisation) => {
  const { onOpen } = useModal();
  return (
    <>
      <div
        className="flex h-[64px] items-center justify-between group bg-neutral-200 rounded-lg p-4 pl-10 shadow-xl transition"
      >
        <p className="text-neutral-600 text-base lg:text-xl font-semibold">{name}</p>
        <div className="flex items-center gap-x-2">
          <Pencil
            onClick={() =>
              onOpen("editOrganisation", {
                organisationId: id,
                organisationName: name,
              })
            }
            className="w-8 h-8 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
              p-1 text-neutral-500 transition"
          />
          <Trash2
            onClick={() =>
              onOpen("deleteOrganisation", {
                organisationId: id,
                organisationName: name,
              })
            }
            className="w-8 h-8 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
          p-1 text-red-400 lg:transition"
          />
        </div>
      </div>
      <Table>
        <TableBody>
          {moneyAccountList.map((moneyAccount) => (
            <TableRow
              key={moneyAccount.id}
              className="group flex items-center text-[12px] lg:text-[16px] transition"
            >
              <TableCell className="w-[30%] px-10 group transition">
                {moneyAccount.name}
              </TableCell>
              <TableCell className="w-[30%] text-center px-10">
                {moneyAccount.numberOfAccount}
              </TableCell>
              <TableCell className="w-[30%] text-right px-10">
                {moneyAccount.balance} ₽
              </TableCell>
              <TableCell className="flex w-[100px] ">
              <div className="flex items-center gap-x-4 lg:gap-x-2">
              <Pencil
                    onClick={() =>
                      onOpen("editMoneyAccount", {
                        moneyAccountId: moneyAccount.id,
                        moneyAccountName: moneyAccount.name,
                        organisationId: moneyAccount.organisationId,
                        balance: moneyAccount.balance,
                        numberOfAccount: moneyAccount.numberOfAccount,
                      })
                    }
                    className="w-8 h-8 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                      p-1 text-neutral-500 transition"
                  />
                <Trash2
                  onClick={() =>
                    onOpen("deleteMoneyAccount", {
                      moneyAccountId: moneyAccount.id,
                      moneyAccountName: moneyAccount.name,
                    })
                  }
                  className="w-8 h-8 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                  p-1 text-red-400 transition"
                />
              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SettingsItem;
