import React, { useState, useEffect } from 'react';
import './TableFilter.css';

const TableFilter = ({ transactions, onFilter, header }) => {
  const [factDateStartMonth, setFactDateStartMonth] = useState('');
  const [factDateStartYear, setFactDateStartYear] = useState('');
  const [factDateStopMonth, setFactDateStopMonth] = useState('');
  const [factDateStopYear, setFactDateStopYear] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('В работе');

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const getMonthName = (month) => {
    return monthNames[month - 1];
  };

  useEffect(() => {
    const filteredTransactions = transactions.filter(transaction => {
      // Фильтр по planDateStart
      const factDateStartMatch =
        (!factDateStartMonth || (transaction.factDateStart && new Date(transaction.factDateStart).getMonth() + 1 === parseInt(factDateStartMonth))) &&
        (!factDateStartYear || (transaction.factDateStart && new Date(transaction.factDateStart).getFullYear() === parseInt(factDateStartYear)));

      // Фильтр по factDateStart
      const factDateStopMatch =
        (!factDateStopMonth || (transaction.factDateStop && transaction.factDateStop !== 'Нет данных' && new Date(transaction.factDateStop).getMonth() + 1 === parseInt(factDateStopMonth))) &&
        (!factDateStopYear || (transaction.factDateStop && transaction.factDateStop !== 'Нет данных' && new Date(transaction.factDateStop).getFullYear() === parseInt(factDateStopYear)));

      // Фильтр по транзакции
      const transactionMatch =
        !transactionFilter || transaction.transaction.toLowerCase().includes(transactionFilter.toLowerCase());

      // Фильтр по статусу
      const statusMatch = !statusFilter || transaction.status === statusFilter;

      return factDateStartMatch && factDateStopMatch && transactionMatch && statusMatch;
    });

    onFilter(filteredTransactions);
  }, [
    factDateStartMonth,
    factDateStartYear,
    factDateStopMonth,
    factDateStopYear,
    transactionFilter,
    statusFilter,
    transactions,
    onFilter,
  ]);

  const years = Array.from({ length: 5 }, (_, i) => 2023 + i); // Создаем массив лет с 2022 по 2026

    return (       <div className="filter-container">
      <table className="stats-table">
  <tr>
    <th colSpan="2" className="stats-header">Всего человек</th> 
    <th className="stats-subheader">Механик <br/>электрон. <br/>технолог <br/>электрик <br/>комплект.</th> 
    <th className="stats-value">{header.mechanicCount}<br/>{header.eletronCount}<br/>{header.techCount}<br/>{header.elecCount}<br/>{header.conplectCount}</th> 
    <th className="stats-header">Занято</th> 
    <th className="stats-subheader">Механик <br/>электрон.<br/>технолог<br/>электрик <br/>комплект.</th>
    <th className="stats-value">0<br/>0<br/>0<br/>0<br/>0</th>  
    <th className="stats-header">Свободно</th> 
    <th className="stats-subheader">Механик <br/>электрон. <br/>технолог <br/>электрик <br/>комплект.</th>
    <th className="stats-value">{header.mechanicCount}<br/>{header.eletronCount}<br/>{header.techCount}<br/>{header.elecCount}<br/>{header.conplectCount}</th> 
  </tr>
</table>

      {/* Фильтр по planDateStart */}
      <label className="filter-label">
        Начало (факт):
        <select className="filter-select" value={factDateStartMonth} onChange={e => setFactDateStartMonth(e.target.value)}>
          <option value="">Все месяцы</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {getMonthName(i + 1)}
            </option>
          ))}
        </select>
        <select className="filter-select" value={factDateStartYear} onChange={e => setFactDateStartYear(e.target.value)}>
          <option value="">Все года</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      {/* Фильтр по factDateStart */}
      <label className="filter-label">
        Завершение (факт):
        <select className="filter-select" value={factDateStopMonth} onChange={e => setFactDateStopMonth(e.target.value)}>
          <option value="">Все месяцы</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {getMonthName(i + 1)}
            </option>
          ))}
        </select>
        <select className="filter-select" value={factDateStopYear} onChange={e => setFactDateStopYear(e.target.value)}>
          <option value="">Все года</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      {/* Фильтр по транзакции */}
      <label className="filter-label">
        Транзакция:
        <input type="text" className="filter-input" value={transactionFilter} onChange={e => setTransactionFilter(e.target.value)} />
      </label>

      {/* Фильтр по статусу */}
      <label className="filter-label">
        Статус:
        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Все</option>
          <option value="Закрыта">Закрыта</option>
          <option value="В работе">В работе</option>
          <option value="Ждет отгрузки">Ждет отгрузки</option>
        </select>
      </label>

<div className="depo-legend4">
  <div className="legend-item4">
    <div className="legend-color4 success"></div>
    <span>Выполнено в срок</span>
  </div>
  <div className="legend-item4">
    <div className="legend-color4 error"></div>
    <span>Просрочено</span>
  </div>
  <div className="legend-item4">
    <div className="legend-color4 warning"></div>
    <span>Нет данных</span>
  </div>
  <div className="legend-item4">
    <div className="legend-color4 control"></div>
    <span>Контроль руководителя</span>
  </div>
</div>
    </div>
  );
};

export default TableFilter;