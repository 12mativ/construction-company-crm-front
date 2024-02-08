import Header from "@/components/header";
import Menu from "@/components/menu/menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className='bg-neutral-100 p-20 pt-32'>
        <main>{children}</main>
      </div>
    </div>
  );
}
