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
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import { formateComplexDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Works = () => {
    const [isLoading, setIsLoading] = useState(false);
    const worksGroups = useAppSelector(
        (state) => state.worksGroupsReducer.worksGroups
    );
    const sortedWorkGroups = worksGroups.map((workGroup) => {
        const sortedWorkEntityList = workGroup.workEntityList.slice().sort((a, b) => a.number - b.number);

        return {
            ...workGroup,
            workEntityList: sortedWorkEntityList,
        };
    });

    const dispatch = useAppDispatch();

    const { projectId } = useParams<{ projectId: string }>();

    useEffect(() => {
        setIsLoading(true);
        getWorksGroups(projectId)
            .then((res) => {
                dispatch(addWorksGroups(res.data));
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
                        <TableHead className="flex-1">Работы</TableHead>
                        <TableHead className="flex-2 w-[180px] text-center px-1">Крайний срок</TableHead>
                        <TableHead className="flex-2 w-[180px] text-center px-1">Прогресс работы</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>

            {sortedWorkGroups.map((worksGroup) => (
                worksGroup.workEntityList.map((workEntity) => (
                    <TableBody>
                        <TableRow
                            key={workEntity.id}
                            className="flex hover:bg-muted/0"
                        >
                            <TableCell className="flex-1 text-left">
                                {workEntity.name}
                            </TableCell>
                            <TableCell className="flex-2 w-[180px] text-center px-1">
                                {formateComplexDate(workEntity.endDate)}
                            </TableCell>
                            <TableCell className="flex-2 w-[180px] text-center px-1">
                                <p>
                                    <span className="text-red-500">{workEntity.doneQuantity}</span>/{workEntity.quantity} {workEntity.measureUnit}
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))
            ))}
        </div>
    )
}

export default Works;