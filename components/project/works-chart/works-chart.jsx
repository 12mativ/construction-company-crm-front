'use client';

import { useEffect, useState } from 'react';
import Grid from './grid';
import Settings from './settings';
import Tasks from './tasks';
import TimeRange from './time-range';
import TimeTable from './time-table';

export default function WorksChart() {
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: new Date().getFullYear(),
    toSelectMonth: 11,
    toSelectYear: new Date().getFullYear(),
  });

  useEffect(() => {
    //TODO make request for works list
  }, []);

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
          setTaskDurations={setTaskDurations}
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
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
