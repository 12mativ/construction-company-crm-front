'use client';

import AddButton from "@/components/addButton";
import SettingsItem from "@/components/settings/settings-item";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getOrganisations } from "@/http/organisations/organisationsAPI";
import { addOrganisations } from "@/lib/features/organisations/organisationsSlice";
import { useEffect, useState } from "react";

const Page = () => {
  const [isOrganisationsLoading, setIsOrganisationsLoading] = useState(false)

  const dispatch = useAppDispatch();
  const organisations = useAppSelector((state) => state.organisationsReducer.organisations);
  
  useEffect(() => {
    setIsOrganisationsLoading(true);

    getOrganisations()
    .then((res) => {
      dispatch(addOrganisations(res.data))
    })
    .finally(() => {
      setIsOrganisationsLoading(false);
    })
  }, [])

  if (isOrganisationsLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className='flex flex-col gap-y-4 bg-white p-10 rounded-lg'>
      <p className="text-2xl font-semibold pb-2">Счета</p>

      <Table>
        <TableHeader>
          <TableRow key="settingsHeader" className="text-neutral-400 px-10 text-[16px]">
            <TableHead className="w-[30%] px-4">Название</TableHead>
            <TableHead className='w-[30%] text-center px-4'>Номер счета</TableHead>
            <TableHead className="w-[30%] text-right px-11">
              Баланс
            </TableHead>
            <TableHead className="w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {organisations.map((organisation) => (
        <SettingsItem key={organisation.id} {...organisation} />
      ))}

      <div className="flex justify-end">
        <AddButton buttonText="Организация" modalName="createOrganisation" />
        <AddButton buttonText="Счет" modalName="createMoneyAccount" />
      </div>
    </div>
  );
};

export default Page;
