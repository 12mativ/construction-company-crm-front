"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { RoleType, deleteRole, addRole } from "@/http/roles-manage/rolesManageAPI";
import { editUserRoles } from "@/lib/features/users/usersSlice";
import { useEffect, useState } from "react";

import { X } from "lucide-react";

export const EditUserRolesModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const [email, setEmail] = useState<string>('');
  const [roles, setRoles] = useState<RoleType[]>([]);

  const isModalOpen = isOpen && type === "editUserRoles";

  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();
  };

  const roleTypes: RoleType[] = ["ADMIN", "ACCOUNTANT", "EMPLOYEE"]; // надо подумать как избегать такого

  const [selectedValue, setSelectedValue] = useState('');
  const [availableValues, setAvailableValues] = useState<RoleType[]>([])

  //@ts-ignore
  const pushRole = (event) => {
    setSelectedValue(event.target.value);

    if (event.target.value != "") {
      var _roles = roles.slice();
      _roles.push(event.target.value);
      dispatch(editUserRoles({email: email, roles: _roles}));
      setRoles(_roles);

      setAvailableValues(roleTypes.filter((value) => !_roles.includes(value)))
    }

    setSelectedValue('')

    addRole({username: email, roleType: event.target.value})
  };

  useEffect(() => {
    const user = data.user;
    if (user) {
      if (user.roles) {
        setRoles(user.roles);
        setAvailableValues(roleTypes.filter((value) => !user.roles.includes(value)))
      }
      if (user.email) {
        setEmail(user.email);
      }
    }
    
  }, [data.user, isOpen]);

  const removeRole = async (role: RoleType) => {
    var _roles = roles.slice();
    _roles = _roles.filter((_role) => _role != role);
    dispatch(editUserRoles({email: email, roles: _roles}));
    setRoles(_roles);

    setAvailableValues(roleTypes.filter((value) => !_roles.includes(value)))

    deleteRole({username: email, roleType: role});
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-y-2">
          <DialogTitle>Измените роли пользователя</DialogTitle>
          <DialogDescription>Удалите или добавьте нужные роли.</DialogDescription>
        </DialogHeader>
        <p>{email}</p>
        <div className="flex flex-col items-start space-y-4 max-w-450">
        {roles.map((role) => (
          <div key={role} className="bg-gray-200 p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-300">
            <button className="flex items-start" onClick={() => {removeRole(role)}}>{role} <X/></button>
          </div>
        ))}
        </div>

        <p>Добавить роль:</p>
        <div className="inline-block relative">
          <select 
          value={selectedValue} 
          onChange={pushRole}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Выберите роль</option>
            {availableValues.map((value_to_name) => (
              <option value={value_to_name}>{value_to_name}</option>
            ))}
          </select>
        </div>
      </DialogContent>
    </Dialog>
  );
};
