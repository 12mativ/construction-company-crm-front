"use client";

import AddButton from "@/components/addButton";
import { ErrorAlert } from "@/components/errorAlert";
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
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { projectId } = useParams<{ projectId: string }>();

  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getUsers(+projectId)
      .then((res) => {
        dispatch(addUsers(res.data));
      })
      .catch((error: AxiosError | any) => {
        setError("Произошла ошибка при загрузке пользователей.")
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
      {error && <ErrorAlert error={error} />}
      <Table>
        <TableHeader>
          <TableRow key="projectHeader">
            <TableHead className="px-4">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
        <p className="text-center">В команде нет ни одного сотрудника.</p>
      )}

      <AddButton buttonText="Добавить сотрудника" modalName="addUserToProject" data={{projectId: projectId}} />
    </div>
  );
};

export default Page;
