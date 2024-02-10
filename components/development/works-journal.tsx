"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { getWorksProgress } from "@/http/works-progress/worksProgressAPI";
import { IWorkEntity, addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { addWorksProgress } from "@/lib/features/works-progress/worksProgressSlice";
import { formateComplexDate, formateSimpleDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorksJournal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const worksProgress = useAppSelector(
        (state) => state.worksProgressReducer.worksProgress
    );
    const worksGroups = useAppSelector((state) => state.worksGroupsReducer.worksGroups)
    const dispatch = useAppDispatch();

    const { projectId } = useParams<{ projectId: string }>();

    useEffect(() => {
        setIsLoading(true);
        getWorksProgress(projectId)
            .then((res) => {
                dispatch(addWorksProgress(res.data));
            })
            .finally(() => setIsLoading(false));

    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }
    return (
        <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-xl">
            <Table>
                <TableHeader>
                    <TableRow key="worksHeader">
                        <TableHead className="flex-1 px-1">Работа</TableHead>
                        <TableHead className="flex-2 w-[180px] text-center px-1">Дата</TableHead>
                        <TableHead className="flex-2 w-[180px] text-center px-1">Выполненный объем</TableHead>
                        <TableHead className="flex-2 w-[180px] text-center px-1">Всего</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>

            {worksProgress.map((workProgress) => { 
                let currentWork: IWorkEntity | undefined;

                worksGroups.forEach((worksGroup) => {
                    currentWork = worksGroup.workEntityList.find((workEntity) => workEntity.id === workProgress.id)
                })
                
                return <TableBody>
                    <TableRow
                        key={workProgress.id}
                        className="flex hover:bg-muted/0"
                    >
                        <TableCell className="flex-1 text-left">
                            {currentWork?.name}
                        </TableCell>
                        <TableCell className="w-[180px] text-center px-1">
                            {formateSimpleDate(workProgress.timestamp)}
                        </TableCell>
                        <TableCell className="w-[180px] text-center px-1">
                            {workProgress.quantityAfter - workProgress.quantityBefore}
                        </TableCell>
                        <TableCell className="w-[180px] text-center px-1">
                            {currentWork?.doneQuantity}/{currentWork?.quantity}
                        </TableCell>
                    </TableRow>
                </TableBody>
            })}
        </div>
    )
}

export default WorksJournal;