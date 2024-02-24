"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getUsers } from "@/http/users/usersAPI";
import { addUsers } from "@/lib/features/users/usersSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();

  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getUsers(+projectId)
      .then((res) => {
        dispatch(addUsers(res.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bg-white p-3 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="px-4">Email</TableHead>
            <TableHead className="w-[140px]">Тел.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow>
            	{user.email}
            </TableCell>
						<TableCell>
							{user.email}
						</TableCell>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
        <p className="text-center">В команде нет ни одного сотрудника.</p>
      )}
    </div>
  );
};

export default Page;
