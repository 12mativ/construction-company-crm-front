import { useEffect, useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      <div className="gantt-task-row-small"></div>
      <div className="gantt-task-row-small"></div>
      <div className="gantt-task-row-small"></div>
      {tasks &&
        (
          <>
            {
              tasks.map((tsk, i) => (
                <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
                  <TooltipProvider className="w-full overflow-hidden text-ellipsis text-left">
                    <Tooltip className="flex flex-col">
                      <TooltipTrigger className='w-full text-left'>
                        {tsk.number === 1 &&
                          <p className='font-semibold text-lg'>{tsk.worksGroupNumber}. {tsk.worksGroupName}</p>
                        }
                        <p data-task-id={tsk?.id} ref={(el) => (inputRef.current[i] = el)} className=' text-sm'>
                          {tsk?.name}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        {tsk.number === 1 &&
                          <p className='font-semibold text-lg'>{tsk.worksGroupNumber}. {tsk.worksGroupName}</p>
                        }
                        <p data-task-id={tsk?.id} ref={(el) => (inputRef.current[i] = el)}>
                          {tsk?.name}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))
            }
          </>

        )

      }

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
          width: 300px;
        }

        .gantt-task-row {
          display: flex;
          flex-direction: column;
          outline: 0.5px solid var(--color-outline);
          align-items: center;
          justify-content: center;
          height: var(--cell-height);
          border: none;
          padding: 10px;
        }

        .gantt-task-row-small {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          align-items: center;
          justify-content: center;
          height: 40px;
          border: none;
        }

        p {
          width: 100%;
          border: none;
          outline: none;
          background: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
