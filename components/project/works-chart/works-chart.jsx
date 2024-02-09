'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getWorksGroups } from "@/http/works-groups/worksGroupsAPI";
import { addWorksGroups } from "@/lib/features/works-groups/worksGroupsSlice";
import Grid from './grid';
import Settings from './settings';
import Tasks from './tasks';
import TimeRange from './time-range';
import TimeTable from './time-table';

export default function WorksChart() {
  const tasks = [];
  const taskDurations = [];

  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: new Date().getFullYear(),
    toSelectMonth: 11,
    toSelectYear: new Date().getFullYear(),
  });

  const { projectId } = useParams();

  const dispatch = useAppDispatch();
  const worksGroups = useAppSelector(
    (state) => state.worksGroupsReducer.worksGroups
  );

  const sortedWorksGroups = worksGroups.map((workGroup) => {
    const sortedWorkEntityList = workGroup.workEntityList.slice().sort((a, b) => a.number - b.number);

    return {
      ...workGroup,
      workEntityList: sortedWorkEntityList,
    };
  });

  sortedWorksGroups.forEach((workGroup) => {
    workGroup.workEntityList.forEach((workEntity) => {
      tasks.push({
        id: workEntity.id,
        name: `${workGroup.number}.${workEntity.number} ${workEntity.name}`,
        number: workEntity.number,
        worksGroupName: workGroup.name,
        worksGroupNumber: workGroup.number,
      });

      const startDate = new Date(workEntity.startDate).toISOString().split('T')[0];
      const endDate = new Date(workEntity.endDate).toISOString().split('T')[0];

      taskDurations.push({
        id: workEntity.id,
        start: startDate,
        end: endDate,
        task: workEntity.id
      });
    });
  });

  useEffect(() => {
    setIsLoading(true);
    getWorksGroups(projectId)
      .then((res) => {
        dispatch(addWorksGroups(res.data));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div id="gantt-container">
      <Settings>
        <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </Settings>
      <Grid>
        <Tasks
          tasks={tasks}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}
        />
      </Grid>

      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #4be35a;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          --color-outline: #e9eaeb;
          --border-radius: 5px;
          --cell-height: 70px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
