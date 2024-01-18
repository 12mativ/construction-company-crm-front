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
import { login } from "@/http/userAPI";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { makeAuth } from "@/lib/features/user/userSlice";

const formSchema = z.object({
  username: z.string().email({ message: "Неверный формат почты." }),

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

  const dispatch = useAppDispatch();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: any = await login(
        values.username,
        values.password
      );

      if (response.status === 400) {
        return;
      }

      const role = response.data.user.authorities[0].authority;
      const token = response.data.jwt

      dispatch(makeAuth({ role: role, token: token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <p className="text-center font-bold text-lg pb-4">Войдите в аккаунт</p>
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
                    {...field}
                  />
                </FormControl>
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
              Войти
            </Button>
          </div>
        </form>
      </Form>
      <p className="pt-5 text-center text-sm">
        Нет аккаунта? <br />
        <Link href={"/register"} className="text-red-600">
          Зарегистрируйтесь!
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;
