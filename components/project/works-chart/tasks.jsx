import { useEffect, useRef } from 'react';

export default function Tasks({ tasks }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`}>
            <div className="gantt-task-row">
              <p data-task-id={task?.id} ref={(el) => (inputRef.current[task.id] = el)}>
                {tsk.number}. {tsk.name}
              </p>

            </div>
            {tsk.tasks.map((task, index) => (
              <div key={`${index}-${task?.id}-${task.name}`} className="gantt-task-row">
                <p data-task-id={task?.id} ref={(el) => (inputRef.current[task.id] = el)}>
                  {task?.name}
                </p>
              </div>
            ))}
          </div>

        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          align-items: center;
          justify-content: center;
          height: var(--cell-height);
          border: none;
        }

        p {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
