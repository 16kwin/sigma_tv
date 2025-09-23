import React, { useState, useEffect } from 'react';
import './productionFilter.css';

const ProductionFilter = ({ onFilterChange }) => {
  const months = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' },
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const generateYears = () => {
    const years = [];
    const startYear = 2023;
    const endYear = currentYear;
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    if (year === currentYear && selectedMonth > currentMonth) {
      setSelectedMonth(currentMonth);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        year: selectedYear,
        month: selectedMonth
      });
    }
  }, [selectedYear, selectedMonth, onFilterChange]);

  const isMonthDisabled = (monthValue) => {
    return selectedYear === currentYear && monthValue > currentMonth;
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="year-select" className="filter-label">Год: </label>
        <select 
          id="year-select" 
          value={selectedYear} 
          onChange={handleYearChange} 
          className="filter-select"
        >
          {generateYears().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="month-select" className="filter-label">Месяц: </label>
        <select 
          id="month-select" 
          value={selectedMonth} 
          onChange={handleMonthChange} 
          className="filter-select"
        >
          {months.map((month) => (
            <option 
              key={month.value} 
              value={month.value}
              disabled={isMonthDisabled(month.value)}
              className={isMonthDisabled(month.value) ? 'disabled-month' : ''}
            >
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-legend5">
        <div className="legend-item5">
          <div className="legend-color5 success"></div>
          <span className="legend-label5">Положительные значения</span>
        </div>
        <div className="legend-item5">
          <div className="legend-color5 warning"></div>
          <span className="legend-label5">Отрицательные значения</span>
        </div>
        <div className="legend-item5">
          <div className="legend-color5 neutral"></div>
          <span className="legend-label5">Нет данных</span>
        </div>
      </div>
    </div>
  );
};

export default ProductionFilter;