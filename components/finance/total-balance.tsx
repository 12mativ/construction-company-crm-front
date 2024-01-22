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
import React, { useEffect, useState } from "react";

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

  const organisations = useAppSelector(
    (state) => state.organisationsReducer.organisations
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getOrganisations().then((res) => {
      dispatch(addOrganisations(res.data));
    });

    getTransactions().then((res) => {
      dispatch(addTransactions(res.data));
    });

    getCounterparties()
      .then((res) => {
        dispatch(addCounterparties(res.data));
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
      <Table>
        <TableBody>
          <TableRow key="totalAmount">
            <TableCell className="font-bold text-2xl">Общий баланс</TableCell>
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
