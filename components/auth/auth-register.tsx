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
      const registerResponse: any = await register(
        values.username,
        values.password,
        values.role as RoleType
      );

      if (registerResponse.status === 400) {
        return;
      }

      const username = registerResponse.data.username;

      const loginResponse = await login(values.username, values.password);
      if (loginResponse.status === 400) {
        return;
      }

      const role = loginResponse.data.authority;
      const token = loginResponse.data.jwt;

      dispatch(makeAuth({ username: username, role: role, token: token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <p className="text-center font-bold text-lg pb-4">Зарегистрируйтесь</p>
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
              className="w-fit self-end"
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </Form>
      <p className="pt-5 text-center text-sm">
        Есть аккаунт? <br />
        <Link href={"/login"} className="text-red-600">
          Войдите!
        </Link>
      </p>
    </div>
  );
};

export default AuthRegister;
