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
import { login } from "@/http/user/userAPI";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { makeAuth } from "@/lib/features/user/userSlice";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Checkbox } from "../ui/checkbox";
import { ErrorAlert } from "../errorAlert";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().email({ message: "Неверный формат электронной почты." }),

  password: z
    .string()
    .min(5, { message: "Минимальная длина пароля 5 символов" })
    .max(50, { message: "Минимальная длина пароля 50 символов" }),
});

const AuthLogin = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginError, setLoginError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useAppDispatch();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values.username, values.password);

      const authorities = response.authorities;
      const roles = response.roles;
      const username = response.sub!;

      dispatch(makeAuth({ username: username, authorities: authorities, roles: roles, isAuth: true }));
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(err)) {
        setLoginError(err.response?.data.message);
      } else {
        setLoginError(err);
      }
    }
  };

  return (
    <div className="flex bg-white p-5 rounded-lg shadow-lg">
      <div className="hidden sm:block">
        <Image src="/soyuz.png" alt="" width={380} height={100} />
      </div>
      <div className=" w-80 flex flex-col justify-between">
        <p className="text-center font-bold text-lg pt-8">Войдите в аккаунт</p>
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

            <div className="flex flex-col gap-y-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Пароль..."
                        type={isPasswordVisible ? "text" : "password"}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="self-end flex items-center gap-x-2">
                <Checkbox
                  id="isPasswordVisible"
                  checked={isPasswordVisible}
                  onClick={() =>
                    setIsPasswordVisible((prevState) => !prevState)
                  }
                />
                <label
                  htmlFor="isPasswordVisible"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Показать пароль
                </label>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <Button
                disabled={isLoading}
                type="submit"
                className="hover:bg-red-600"
              >
                Войти
              </Button>
            </div>
          </form>
        </Form>

        {loginError && <ErrorAlert error={loginError} />}

        <p className="pt-5 text-center text-sm">
          Нет аккаунта? <br />
          <Link href={"/register"} className="text-red-500">
            Зарегистрируйтесь!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
