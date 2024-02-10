import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center w-full h-full">
      <p className="font-semibold text-2xl">Ошибка 404. Страница не найдена.</p>
      <Link className="text-red-500 text-lg" href="/projects">
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default Page;
