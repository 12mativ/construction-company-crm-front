"use client";

import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { redirect, useParams, useRouter } from "next/navigation";
import ProjectMenu from "@/components/project-menu/project-menu";
import { formateComplexDate, isAdmin } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProjectStatus } from "@/http/projects/projectsAPI";
import {
  ProjectStatusType,
  updateProject,
} from "@/lib/features/projects/projectsSlice";
import { useEffect, useState } from "react";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import LoaderIndicator from "@/components/loader";
import { AxiosError } from "axios";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { projects } = useAppSelector((state) => state.projectsReducer);
  const { projectId } = useParams<{ projectId: string }>();
  const currentProject = projects.find((project) => project.id === +projectId);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(state => state.userReducer.user);

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        if (res) {
          dispatch(makeAuth({ username: res.data.username, roles: res.data.roles, authorities: res.data.authorities, isAuth: true }));
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!currentUser.isAuth) {
    return redirect('/login');
  }

	if (isLoading) {
		return <LoaderIndicator />
	}

  const handleUpdateProjectStatus = async (projectStatus: string) => {
    const response = await updateProjectStatus({
      projectId: +projectId,
      projectStatus: projectStatus as ProjectStatusType,
    });

    dispatch(updateProject(response.data));
  };

  return (
    <div className="pb-5">
      <Header />
      <div className="mx-auto px-20 pt-32 flex flex-col sm:flex-row">
        <div className="flex items-center gap-x-4 w-[295px] mb-6">
          <ChevronLeft
            onClick={() => router.push("/projects")}
            className="w-10 h-10 rounded-full hover:bg-neutral-300 cursor-pointer transition"
          />
          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-semibold uppercase">
              {currentProject?.name}
            </p>

            <div className="bg-white text-neutral-500 p-2 rounded-lg shadow-lg text-center">
              {currentProject &&
              currentProject.startDate &&
              currentProject.endDate
                ? `${formateComplexDate(currentProject!.startDate)} -
                ${formateComplexDate(currentProject!.endDate)}`
                : "-"}
            </div>
            <Select
              onValueChange={(e) => handleUpdateProjectStatus(e)}
              defaultValue={currentProject?.projectStatus}
              disabled={!isAdmin(currentUser)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус проекта" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PLANNING">Планирование</SelectItem>
                <SelectItem value="INWORK">В работе</SelectItem>
                <SelectItem value="COMPLETED">Завершен</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <ProjectMenu />
        </div>
        
      </div>
      <div className="max-w-[560px] sm:min-w-[1040px] md:min-w-[1150px] lg:min-w-[1400px] bg-neutral-100 px-20 mx-auto">
        <main>{children}</main>
      </div>
    </div>
  );
}
