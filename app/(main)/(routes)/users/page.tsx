"use client";

import AddButton from "@/components/addButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getAllUsers } from "@/http/users/usersAPI";
import { addUsers } from "@/lib/features/users/usersSlice";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";

import { Pencil } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();

  const { onOpen } = useModal();

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
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
            <TableHead className="px-4">Роли</TableHead>
            <TableHead className="px-4">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roles.map((role) => (
                <div>{role}</div>
              ))}</TableCell>
              <TableCell>
                <Pencil
                      onClick={() =>
                        onOpen("editUserRoles", {
                          user
                        })
                      }
                      className="w-8 h-8 group-hover:opacity-100 hover:bg-neutral-300/50 cursor-pointer rounded-lg 
                        p-1 text-neutral-500 transition"
                    />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
        <p className="text-center">Пользователей нет.</p>
      )}
    </div>
  );
};

export default Page;
