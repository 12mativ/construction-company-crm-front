"use client";

import AddButton from "@/components/addButton";
import { ErrorAlert } from "@/components/errorAlert";
import SettingsItem from "@/components/settings/settings-item";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getOrganisations } from "@/http/organisations/organisationsAPI";
import { addOrganisations } from "@/lib/features/organisations/organisationsSlice";
import { isAdmin } from "@/lib/utils";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isOrganisationsLoading, setIsOrganisationsLoading] = useState(false);
  const currentUser = useAppSelector(state => state.userReducer.user);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );

  useEffect(() => {
    setIsOrganisationsLoading(true);

    getOrganisations()
      .then((res) => {
        dispatch(addOrganisations(res.data));
      })
      .catch((error: AxiosError | any) => {
        setError("Произошла ошибка при загрузке организаций.");
      })
      .finally(() => {
        setIsOrganisationsLoading(false);
      });
  }, []);

  if (!isAdmin(currentUser)) {
    return notFound()
  }

  if (isOrganisationsLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className='flex flex-col w-[400px] sm:w-[493px] lg:w-full gap-y-4 bg-white p-10 rounded-lg'>
      {error && <ErrorAlert error={error} />}
      <p className="text-2xl font-semibold pb-2">Счета</p>
      <Table>
        <TableHeader>
          <TableRow
            key="settingsHeader"
            className="text-neutral-400 px-10 text-[16px]"
          >
            <TableHead className="w-[30%] px-4">Название</TableHead>
            <TableHead className="w-[30%] text-center px-4">
              Номер счета
            </TableHead>
            <TableHead className="w-[30%] text-right px-11">Баланс</TableHead>
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
