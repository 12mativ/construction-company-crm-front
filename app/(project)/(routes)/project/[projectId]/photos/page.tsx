"use client";

import { ErrorAlert } from "@/components/errorAlert";
import PhotoUploader from "@/components/photo-uploader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";
import { getWorksProgress } from "@/http/works-progress/worksProgressAPI";
import { IWorkEntity } from "@/lib/features/works-groups/worksGroupsSlice";
import { addWorksProgress } from "@/lib/features/works-progress/worksProgressSlice";
import { formateComplexDate } from "@/lib/utils";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { worksGroups } = useAppSelector((state) => state.worksGroupsReducer);
  const { worksProgress } = useAppSelector(
    (state) => state.worksProgressReducer
  );

  const { onOpen } = useModal();

  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getWorksProgress(projectId)
      .then((res) => {
        dispatch(addWorksProgress(res.data));
      })
      .catch((error: AxiosError | any) => {
        setError("Произошла ошибка при загрузке фото.")
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sortedWorksProgress = worksProgress.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);

    return dateB.getTime() - dateA.getTime();
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!sortedWorksProgress || sortedWorksProgress.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg text-neutral-400 text-center">
        Пока нет ни одной записи в журнале работ.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 p-4 bg-white rounded-lg">
      {error && <ErrorAlert error={error} />}
      {sortedWorksProgress.map((workProgress) => {
        let currentWork: IWorkEntity | undefined;

        worksGroups.forEach((worksGroup) => {
          worksGroup.workEntityList.forEach((workEntity) => {
            if (workEntity.id === workProgress.workId) {
              currentWork = workEntity;
            }
          });
        });

        return (
          <div
            key={`${workProgress.id}-${currentWork?.id}`}
            className="flex flex-col gap-y-3"
          >
            <div>
              <p className="text-2xl font-semibold">{currentWork?.name}</p>
              <p className="text-sm text-neutral-400">
                ({formateComplexDate(workProgress.timestamp)})
              </p>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              {workProgress.imageIdsList && (
                <PhotoProvider>
                  {workProgress.imageIdsList.map((imageId) => (
                    <PhotoView
                      key={`${currentWork?.id}-${imageId}`}
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/photos/static/${imageId}`}
                    >
                      <div className="relative w-64 h-64 cursor-pointer">
                        <X
                          onClick={(e) => {
                            onOpen("deleteWorkProgressPhoto", { imageId });
                            e.stopPropagation();
                          }}
                          className="bg-white text-red-500 rounded-full absolute top-3 right-3 
                            z-10 hover:scale-110 transition"
                        />
                        <Image
                          fill
                          className="rounded-lg"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/photos/static/${imageId}`}
                          alt={currentWork?.name || "work progress"}
                        />
                      </div>
                    </PhotoView>
                  ))}
                </PhotoProvider>
              )}
              <PhotoUploader progressOfWorkId={workProgress.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
