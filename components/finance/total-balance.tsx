"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getCounterparties } from "@/http/counterparties/counterpartiesAPI";
import { getOrganisations } from "@/http/organisations/organisationsAPI";
import { getTransactions } from "@/http/transactions/transactionsAPI";
import { addCounterparties } from "@/lib/features/counterparties/counterpartiesSlice";
import {
  IOrganisation,
  addOrganisations,
} from "@/lib/features/organisations/organisationsSlice";
import { addTransactions } from "@/lib/features/transactions/transactionsSlice";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { ErrorAlert } from "../errorAlert";

const calculateTotalBalance = (organisations: IOrganisation[]) => {
  let totalBalance = 0;
  organisations.forEach((organisation) => {
    organisation.moneyAccountList.forEach((moneyAccount) => {
      totalBalance += moneyAccount.balance;
    });
  });

  return totalBalance;
};

const TotalBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getOrganisations().then((res) => {
      dispatch(addOrganisations(res.data));
    }).catch((error: AxiosError | any) => {
      setErrors((prevState) => [...prevState, "Произошла ошибка при загрузке организаций."])
    });

    getTransactions().then((res) => {
      dispatch(addTransactions(res.data));
    }).catch((error: AxiosError | any) => {
      setErrors((prevState) => [...prevState, "Произошла ошибка при загрузке транзакций."])
    });

    getCounterparties()
      .then((res) => {
        dispatch(addCounterparties(res.data));
      }).catch((error: AxiosError | any) => {
        setErrors((prevState) => [...prevState, "Произошла ошибка при загрузке контрагентов."])
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      {errors.length !== 0 && errors.map((error, index) => <ErrorAlert key={index} error={error} />)}
      <Table>
        <TableBody>
          <TableRow key="totalAmount">
            {/* <div className="flex sm:justify-center">
              <div className="font-medium text-2xl">Общий баланс</div>
              <div className="font-bold text-2xl text-right">
              {calculateTotalBalance(organisations)} ₽
              </div>
            </div> */}
            <TableCell className="font-medium text-2xl">Общий баланс</TableCell>
            <TableCell></TableCell>
            <TableCell className="font-bold text-2xl text-right">
              {calculateTotalBalance(organisations)} ₽
            </TableCell>
          </TableRow>

          {organisations.map((organisation) => {
            return (
              <React.Fragment key={organisation.id}>
                {organisation.moneyAccountList.map((moneyAccount) => (
                  <TableRow key={moneyAccount.id} className="text-[16px]">
                    <TableCell className="w-[33%] font-bold">
                      {moneyAccount.name}
                    </TableCell>
                    <TableCell className="w-[33%] text-center">
                      {organisation.name}
                    </TableCell>
                    <TableCell className="w-[33%] text-right">
                      {moneyAccount.balance} ₽
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TotalBalance;
