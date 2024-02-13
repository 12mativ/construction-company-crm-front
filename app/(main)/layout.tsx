import Header from "@/components/header";
import MainMenu from "@/components/main-menu/main-menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2">
      <Header />
      <div className="flex bg-neutral-100 p-20 pt-32 gap-x-2">
        <div className="flex justify-center flex-[1]">
          <MainMenu />
        </div>
        <main className="flex-[4] ml-10">{children}</main>
      </div>
    </div>
  );
}
