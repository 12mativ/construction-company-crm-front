"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { RoleType, login, register } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().email({ message: "Неверный формат электронной почты." }),

  password: z
    .string()
    .min(5, { message: "Минимальная длина пароля 5 символов" })
    .max(50, { message: "Минимальная длина пароля 50 символов" }),

  role: z.string({
    required_error: "Выберите роль.",
  }),
});

const AuthRegister = () => {
  const [registerError, setRegisterError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const dispatch = useAppDispatch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const registerResponse = await register(
        values.username,
        values.password,
        values.role as RoleType
      );

      const username = registerResponse.data.username;

      const loginResponse = await login(values.username, values.password);

      const role = loginResponse.data.authority;
      const token = loginResponse.data.jwt;

      dispatch(makeAuth({ username: username, role: role, token: token }));
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setRegisterError(err.response?.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex bg-white p-5 rounded-lg shadow-lg"> 
       <div> 
        <img src="/soyuz.png" alt="" width={380} height={100}/> 
      </div> 
      <div className=" w-80 flex flex-col justify-between"> 
        <p className="text-center font-bold text-lg pt-8">Зарегистрируйтесь</p> 
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
            <FormField 
              control={form.control} 
              name="username" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Логин (email)</FormLabel> 
                  <FormControl> 
                    <Input 
                      placeholder="Логин (email)..." 
                      disabled={isLoading} 
                      {...field} 
                    /> 
                  </FormControl> 
                  <FormMessage /> 
                </FormItem> 
              )} 
            /> 
 
            <FormField 
              control={form.control} 
              name="password" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Пароль</FormLabel> 
                  <FormControl> 
                    <Input 
                      placeholder="Пароль..." 
                      disabled={isLoading} 
                      type="password" 
                      {...field} 
                    /> 
                  </FormControl> 
                  <FormMessage /> 
                </FormItem> 
              )} 
            /> 
 
            <FormField 
              control={form.control} 
              name="role" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Роль</FormLabel> 
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                  > 
                    <FormControl> 
                      <SelectTrigger> 
                        <SelectValue placeholder="Выберите вашу роль" /> 
                      </SelectTrigger> 
                    </FormControl> 
                    <SelectContent> 
                      <SelectItem value="ADMIN">Застройщик</SelectItem> 
                      <SelectItem value="CUSTOMER">Заказчик</SelectItem> 
                      <SelectItem value="ACCOUNTANT">Финансист</SelectItem> 
                      <SelectItem value="EMPLOYEE">Прораб</SelectItem> 
                    </SelectContent> 
                  </Select> 
                  <FormMessage /> 
                </FormItem> 
              )} 
            /> 
 
            <div className="flex flex-col w-full"> 
              <Button 
                disabled={isLoading} 
                type="submit" 
                className="hover:bg-red-600" 
              > 
                Зарегистрироваться 
              </Button> 
            </div> 
          </form> 
        </Form> 
 
        {registerError && <p className="text-red-500 py-2">{registerError}</p>} 
 
        <p className="pt-5 text-center text-sm"> 
          Есть аккаунт? <br /> 
          <Link href={"/login"} className="text-red-600"> 
            Войдите! 
          </Link> 
        </p> 
      </div> 
    </div>
  );
};

export default AuthRegister;
