import { useState } from 'react';
import { months } from './constants';
import {
  createFormattedDateFromStr,
  dayDiff,
  getDayOfWeek,
  getDaysInMonth,
  monthDiff
} from './dateFunctions';

export default function TimeTable({
  timeRange,
  tasks,
  taskDurations,
}) {
  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);

  // for dynamic css styling
  const ganttTimePeriodTop = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(30px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: '40px',
  };

  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(30px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const ganttTimePeriodSpan = {
    margin: 'auto',
  };

  const ganttTimePeriodMonth = {
    margin: 'auto',
    fontWeight: 'bold',
    fontSize: '20px'
  };


  const ganttTimePeriodCell = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDuration = {
    position: 'absolute',
    marginTop: '8px',
    height: 'calc(var(--cell-height) - 16px)',
    zIndex: '1',
    background:
      'linear-gradient(90deg, #de5b5b 0%, #d42424 100%)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
  };

  // creating rows
  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );
  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let weekRows = [];
  let weekRow = [];
  let taskRows = [];
  let taskRow = [];

  for (let i = 0; i < numMonths; i++) {
    // create month rows
    monthRows.push(
      <div key={i} style={{ ...ganttTimePeriodTop, outline: 'none' }}>
        <span style={ganttTimePeriodMonth}>
          {months[month.getMonth()] + ' ' + month.getFullYear()}
        </span>
      </div>
    );

    // create day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;

    for (let j = 1; j <= numDays; j++) {
      dayRow.push(
        <div key={j} style={{ ...ganttTimePeriodTop, outline: 'none' }}>
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );

      weekRow.push(
        <div key={j} style={{ ...ganttTimePeriodTop, outline: 'none' }}>
          <span style={{ ...ganttTimePeriodSpan, color: 'red' }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>
      );
    }

    dayRows.push(
      <div key={i} style={{ ...ganttTimePeriodTop, outline: 'none' }}>
        {dayRow}
      </div>
    );

    weekRows.push(
      <div key={i} style={{ ...ganttTimePeriodTop, outline: 'none' }}>
        {weekRow}
      </div>
    );

    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  // create task rows
  if (tasks) {
    tasks.forEach((task) => {
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          // color weekend cells differently
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );

          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === 'Вс' || dayOfTheWeek === 'Сб' ? 'var(--color-tertiary)' : '#fff',
              }}
              data-task={task?.id}
              data-date={formattedDate}
            >
              {taskDurations.map((el, i) => {
                if (el?.task === task?.id && el?.start === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el?.id}`}
                      tabIndex="0"
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(
                          el?.start,
                          el?.end
                        )} * 100% - 1px)`,
                        opacity:
                          taskDurationElDraggedId === el?.id ? '0.5' : '1',
                      }}
                    ></div>
                  );
                }
              })}
            </div>
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  return (
    <div
      id="gantt-grid-container__time"
      style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
    >
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: '0.5px',
        }}
      >
        {taskRows}
      </div>
      <style jsx>{`
        #gantt-grid-container__time {
          display: grid;
          overflow-x: auto;
          outline: 0.5px solid var(--color-outline);
        }

        .taskDuration {
          position: absolute;
          height: calc(var(--cell-height) / 3);
          top: calc(var(--cell-height) / 3);
          z-index: 1;
          background: linear-gradient(
            90deg,
            #b53f3f 0%,
            #802d2d 100%
          );
          border-radius: 2px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}
