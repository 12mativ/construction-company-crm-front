import Menu from "@/components/menu/menu";
import Projects from "@/components/project/projects";

export default function Home() {
  return (
    <div className="flex gap-x-20 h-full bg-neutral-100 overflow-y-auto">
      <Projects />
    </div>
  );
}
