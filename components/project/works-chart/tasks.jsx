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
      <div className="gantt-task-row"></div>
      {tasks &&
        (
          <>
            {/* <div className="gantt-task-row">
              <p data-task-id={1} ref={(el) => (inputRef.current[1] = el)}>
                Заголовок
              </p>
            </div> */}
            {
              tasks.map((tsk, i) => (
                <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
                  <p data-task-id={tsk?.id} ref={(el) => (inputRef.current[i] = el)}>
                    {tsk?.name}
                  </p>
                </div>
              ))
            }
          </>

        )

      }

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
          width: 200px;
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          align-items: center;
          height: var(--cell-height);
          border: none;
        }

        p {
          width: 100%;
          border: none;
          outline: none;
          background: none;
          padding: 10px;
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
