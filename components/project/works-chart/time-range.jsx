import { months } from './constants';

export default function TimeRange({ timeRange, setTimeRange }) {
  // add date selector values
  let monthsOptions = [];
  for (let i = 0; i < months.length; i++) {
    monthsOptions.push(
      <option key={i} value={i}>
        {months[i]}
      </option>
    );
  }

  const yearsOptions = [];
  for (let i = 2022; i <= 2050; i++) {
    yearsOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function onChange(e) {
    const { value, id } = e.target;
    if (id === 'from-select-month') {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectMonth: value };
      });
    }
    if (id === 'from-select-year') {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectYear: value };
      });
    }
    if (id === 'to-select-month') {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectMonth: value };
      });
    }
    if (id === 'to-select-year') {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectYear: value };
      });
    }
  }

  return (
    <div id="time-range__container">
      <div id="time-range">
        <fieldset id="select-from" style={{ paddingLeft: '0px', paddingRight: '10px' }}>
          <legend>От</legend>
          <select
            id="from-select-month"
            name="from-select-month"
            value={timeRange.fromSelectMonth}
            onChange={onChange}
          >
            {monthsOptions}
          </select>
          <select
            id="from-select-year"
            name="from-select-year"
            value={timeRange.fromSelectYear}
            onChange={onChange}
            style={{ marginLeft: '5px' }}
          >
            {yearsOptions}
          </select>
        </fieldset>

        <fieldset id="select-to">
          <legend>До</legend>
          <select
            id="to-select-month"
            name="to-select-month"
            value={timeRange.toSelectMonth}
            onChange={onChange}
          >
            {monthsOptions}
          </select>
          <select
            id="to-select-year"
            name="to-select-year"
            value={timeRange.toSelectYear}
            onChange={onChange}
            style={{ marginLeft: '5px' }}
          >
            {yearsOptions}
          </select>
        </fieldset>
      </div>
      <style jsx>{`


        #time-range__container > * {
          display: flex;
          align-items: center;
        }

        #time-range {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 0.75rem 0;
        }

        fieldset {
          border: none;
        }

        fieldset label {
          margin-right: 10px;
        }

        select {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
