"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { createPhoto } from "@/http/photos/photosAPI";
import { addWorkProgressImage } from "@/lib/features/works-progress/worksProgressSlice";
import { cn } from "@/lib/utils";
import { Image, Loader, Upload, X } from "lucide-react";
import { useState } from "react";

interface PhotoUploaderProps {
  progressOfWorkId: number;
}

const PhotoUploader = ({ progressOfWorkId }: PhotoUploaderProps) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("progressOfWorkId", String(progressOfWorkId));

    try {
      setIsFileLoading(true);
      const response = await createPhoto(formData);
      dispatch(
        addWorkProgressImage({
          progressOfWorkId: progressOfWorkId,
          imageId: response.data.uuid,
        })
      );
      setFile(undefined);
      setIsFileLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="group flex items-center justify-center w-[250px] hover:bg-gray-100">
      <label
        htmlFor={String(progressOfWorkId)}
        className={cn(
          "flex flex-col items-center justify-center p-4 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 transition",
          !file && "cursor-pointer group-hover:bg-gray-100"
        )}
      >
        <div className="flex flex-col w-full relative overflow-hidden gap-y-2 justify-center">
          {file ? (
            <>
              <X
                onClick={(e) => {
                  e.preventDefault();
                  setFile(undefined);
                }}
                className="absolute p-1 top-0 right-8 cursor-pointer"
                size={30}
              />
              <Image className="w-20 h-20 text-neutral-500 self-center" />
              <p className="text-sm truncate">{file.name}</p>
            </>
          ) : (
            <>
              <Upload className="w-20 h-20 text-neutral-500 self-center" />
              <p className="mb-2 text-sm text-neutral-500 text-center font-semibold">
                Нажмите, чтобы загрузить фото
              </p>
            </>
          )}

          {file && (
            <Button 
							className="flex items-center gap-x-2"
							disabled={isFileLoading} 
							onClick={onSubmit}
						>
              <p>{isFileLoading ? "Загрузка..." : "Загрузить"}</p>
							{isFileLoading && <Loader className="animate-spin" size={30} />}
            </Button>
          )}
        </div>

        {!file && (
          <Input
            id={String(progressOfWorkId)}
            accept="image/*"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        )}
      </label>
    </div>
  );
};

export default PhotoUploader;
