import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableFilter from './TableFilter';
import "./table.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function calculateDays(days) {
  if (!days || days === "Нет данных") {
    return "Нет данных";
  }

  const daysInt = parseInt(days, 10); // Преобразуем в число

  const remainder10 = daysInt % 10;
  const remainder100 = daysInt % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return `(${daysInt} рабочий день)`;
  } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 10 || remainder100 >= 20)) {
    return `(${daysInt} рабочих дня)`;
  } else {
    return `(${daysInt} рабочих дней)`;
  }
}

function calculateDaysFromTime(time) {
  if (!time || time === "Нет данных") {
    return "Нет данных";
  }

  const [hours, minutes, seconds] = time.split(':').map(Number);
  const totalHours = hours + minutes / 60 + seconds / 3600;
  const days = Math.ceil(totalHours / 8); // 8 рабочих часов в день

  return calculateDays(days); // Вызываем функцию для форматирования
}

function Table() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Добавляем состояние
 const TOOLTIPS = {
    planPpp: "Суммарное время за все нормативы на операции и опции",
    factTime: "(Дата и время завершения операции (факт))-(Дата и время начала операции (факт))",
    deadline: "|((Затраченное факт-Устранение замеччаний по потерям)/(Норматив на операцию + норматив на опцию)*100)-100|",
    planStart: "Планируемая дата начала по БОС+Нормативы на операцию и опции (с учетом рабочих дней и суточной нормы)",
    forecastStart: "Прогнозируемая дата начала (Управление сделками)+Нормативы на операцию и опции (с учетом рабочих дней и суточной нормы)",
    factStart: "Фактическая дата и время начала выполнения операции",
    planEnd: "Планируемая дата завершения по БОС - Нормативы на операцию и опции (с учетом рабочих дней и суточной нормы)",
    forecastEnd: "Прогнозируемая дата завершения - Нормативы на операцию и опции (с учетом рабочих дней и суточной нормы)",
    factEnd: "Фактическая дата завершения - Нормативы на операцию и опции (с учетом рабочих дней и суточной нормы)",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://194.87.56.253:8081/api/analis/transactions');
        setJsonData(response.data);
        setFilteredTransactions(response.data.transactions); // Инициализируем filteredTransactions
      } catch (err) {
        setError(err);
        console.error("Ошибка при получении данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка при загрузке данных: {error.message}</p>;
  }

  if (!jsonData) {
    return <p>Данные не найдены.</p>;
  }

  const { header, transactions } = jsonData;
const getAdjustedPercentage = (value) => {
  if (value === 'Нет данных') return 0;
  const num = parseFloat(value.replace(',', '.').replace('%', ''));
  return num - 100;
};

// 2. Форматирует результат: "+X.XX%" или "X.XX%"
const formatAdjustedPercentage = (value) => {
  if (value === 'Нет данных'|| value === 'Контроль руководителя' ) return value;
  const adjusted = getAdjustedPercentage(value);
  return adjusted >= 0 
    ? `${adjusted.toFixed(2).replace('.', ',')}%` 
    : `${Math.abs(adjusted).toFixed(2).replace('.', ',')}%`;
};
  return (
    <div className="table-container">
      <TableFilter transactions={transactions} onFilter={setFilteredTransactions} header={header} />
      <br/>
      <br/>
      <div className="table-scroll-wrapper">
        <table className="table-format">
          <thead className="head"> 
            <tr className="strokahead">
              <td className="colonkahead" rowSpan="2" data-tooltip-id="status-tooltip">Статус</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="transaction-tooltip">Транзакция</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="planPpp-tooltip">План на ППП, час</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="operation-tooltip">Операция</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="operationNorm-tooltip">Норматив на операцию, час</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="optionNorm-tooltip">Норматив на опцию, час</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="factTime-tooltip">Затрачено факт, час</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="deadline-tooltip">Закрытие в срок</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="problemTime-tooltip">Устранение замечаний по потерям, час</td>
              <td className="colonkahead" colSpan="3" data-tooltip-id="planStart-tooltip">Начало ППП</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="inputControl-tooltip">Входной контроль</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="connection-tooltip">Подключение</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="mechanicCheck-tooltip">Проверка механиком</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="electronCheck-tooltip">Проверка электронщиком</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="technologistCheck-tooltip">Проверка технологом</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="outputControl-tooltip">Выходной контроль</td>
              <td className="colonkahead" rowSpan="2" data-tooltip-id="transport-tooltip">Транспортное</td>
              <td className="colonkahead" colSpan="3" data-tooltip-id="planEnd-tooltip">Завершение ППП</td>
              <td className="colonkahead" colSpan="3" data-tooltip-id="planShipment-tooltip">Дата отгрузки</td>
            </tr>
            <tr className="strokacolonkahead">
              <td className="colonkahead" data-tooltip-id="planStart-tooltip">План <br/>(По БОС)</td>
              <td className="colonkahead" data-tooltip-id="forecastStart-tooltip">Прогноз <br/>(Упр.сделками)</td>
              <td className="colonkahead" data-tooltip-id="factStart-tooltip">Факт <br/>(Факт начала)</td>
              <td className="colonkahead" data-tooltip-id="planEnd-tooltip">План <br/>(По БОС)</td>
              <td className="colonkahead" data-tooltip-id="forecastEnd-tooltip">Прогноз <br/>(Упр.сделками)</td>
              <td className="colonkahead" data-tooltip-id="factEnd-tooltip">Факт <br/>(Факт завершения)</td>
              <td className="colonkahead" data-tooltip-id="planShipment-tooltip">План</td>
              <td className="colonkahead" data-tooltip-id="forecastShipment-tooltip">Прогноз</td>
              <td className="colonkahead" data-tooltip-id="factShipment-tooltip">Факт</td>
            </tr>
          </thead>
          
          {/* Рендер тултипов */}
          <Tooltip id="status-tooltip" place="bottom" content={TOOLTIPS.status} />
          <Tooltip id="transaction-tooltip" place="bottom" content={TOOLTIPS.transaction} />
          <Tooltip id="planPpp-tooltip" place="bottom" content={TOOLTIPS.planPpp} />
          <Tooltip id="operation-tooltip" place="bottom" content={TOOLTIPS.operation} />
          <Tooltip id="operationNorm-tooltip" place="bottom" content={TOOLTIPS.operationNorm} />
          <Tooltip id="optionNorm-tooltip" place="bottom" content={TOOLTIPS.optionNorm} />
          <Tooltip id="factTime-tooltip" place="bottom" content={TOOLTIPS.factTime} />
          <Tooltip id="deadline-tooltip" place="bottom" content={TOOLTIPS.deadline} />
          <Tooltip id="problemTime-tooltip" place="bottom" content={TOOLTIPS.problemTime} />
          <Tooltip id="planStart-tooltip" place="bottom" content={TOOLTIPS.planStart} />
          <Tooltip id="forecastStart-tooltip" place="bottom" content={TOOLTIPS.forecastStart} />
          <Tooltip id="factStart-tooltip" place="bottom" content={TOOLTIPS.factStart} />
          <Tooltip id="inputControl-tooltip" place="bottom" content={TOOLTIPS.inputControl} />
          <Tooltip id="connection-tooltip" place="bottom" content={TOOLTIPS.connection} />
          <Tooltip id="mechanicCheck-tooltip" place="bottom" content={TOOLTIPS.mechanicCheck} />
          <Tooltip id="electronCheck-tooltip" place="bottom" content={TOOLTIPS.electronCheck} />
          <Tooltip id="technologistCheck-tooltip" place="bottom" content={TOOLTIPS.technologistCheck} />
          <Tooltip id="outputControl-tooltip" place="bottom" content={TOOLTIPS.outputControl} />
          <Tooltip id="transport-tooltip" place="bottom" content={TOOLTIPS.transport} />
          <Tooltip id="planEnd-tooltip" place="bottom" content={TOOLTIPS.planEnd} />
          <Tooltip id="forecastEnd-tooltip" place="bottom" content={TOOLTIPS.forecastEnd} />
          <Tooltip id="factEnd-tooltip" place="bottom" content={TOOLTIPS.factEnd} />
          <Tooltip id="planShipment-tooltip" place="bottom" content={TOOLTIPS.planShipment} />
          <Tooltip id="forecastShipment-tooltip" place="bottom" content={TOOLTIPS.forecastShipment} />
          <Tooltip id="factShipment-tooltip" place="bottom" content={TOOLTIPS.factShipment} />
          <Tooltip
  id="percentage-plan-tooltip"
  place="bottom-start"
  content="|(Затрачено факт/План ППП)*100-100|"/>
            <Tooltip
  id="full-tooltip"
  place="bottom-start"
  content="Затрачено факт - Устранение замечаний по потерям + Межоперационное ожидание"/>
          {filteredTransactions.map(transactions => (
            <React.Fragment key={transactions.transaction}>
              <tbody className="table-body">
                <tr className="stroka">
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDateStart}</td>
                  <td className="colonka">{transactions.forecastDateStart}</td>
                  <td className="colonka">{transactions.factDateStart}</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">Межоперационное ожидание (рабочие дни)</td>
                  <td className="colonka">{transactions.planDateStop}</td>
                  <td className="colonka">{transactions.forecastDateStop}</td>
                  <td className="colonka">{transactions.factDateStop}</td>
                  <td className="colonka" rowspan="8" >{transactions.planDateShipment}</td>
                  <td className="colonka" rowspan="8" >{transactions.forecastDateShipment}</td>
                  <td className="colonka" rowspan="8" >{transactions.factDateShipment}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka" rowspan="7">{transactions.status}</td>
                  <td className="colonka" rowspan="7">{transactions.transaction}</td>
                  <td className="colonka" rowspan="7">{transactions.planPpp}:00:00</td>
                  <td className="colonka">Входной контроль</td>
                  <td className="colonka">{header.vhodNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.vhodControlWorkTime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.vhodControlTimeExceeded === 'Нет данных'
          ? 'lightyellow'
          : transactions.vhodControlTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)'  // Добавлено
            : getAdjustedPercentage(transactions.vhodControlTimeExceeded) <= 0
              ? 'lightgreen'
              : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.vhodControlTimeExceeded)}
</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka date-no-wrap">{transactions.planDateStart}</td>
                  <td className="colonka">
                    {transactions.factDateStart ? transactions.factDateStart : transactions.forecastDateStart}
                  </td>
                  <td className="colonka">{transactions.vhodControlStartTime}</td>
                  <td className="colonka">{transactions.vhodControlEmployee}  <span className='no-break'><br/> Операция:{transactions.vhodControlWorkTime} <br/> Опция: 00:00:00 </span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate1}</td>
                  <td className="colonka">{transactions.factDate1}</td>
                  <td className="colonka">{transactions.vhodControlStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Подключение</td>
                  <td className="colonka">{header.podklyuchenieNorm}:00</td>
                  <td className="colonka">{transactions.electricNorm}:00 </td>
                  <td className="colonka">{transactions.electricTotalWorktime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.electricTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.electricTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.electricTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.electricTimeExceeded)}
</td>
                  <td className="colonka">{transactions.electricProblemHours}:00 </td>
                  <td className="colonka">{transactions.planDate1}</td>
                  <td className="colonka">{transactions.factDate1}</td>
                  <td className="colonka">{transactions.podkluchenieStartTime}</td>
                  <td className="colonka">{transactions.timeBetweenVhodAndPodkluchenie}<br/>{calculateDaysFromTime(transactions.timeBetweenVhodAndPodkluchenie)}</td>
                  <td className="colonka">{transactions.podkluchenieEmployee} <span className='no-break'><br/>Операция:{transactions.podkluchenieWorkTime}<br/>Опция:{transactions.electricOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate2}</td>
                  <td className="colonka">{transactions.factDate2}</td>
                  <td className="colonka">{transactions.podkluchenieStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка механиком</td>
                  <td className="colonka">{header.mechOperationNorm}:00</td>
                  <td className="colonka">{transactions.mechanicNorm}:00</td>
                  <td className="colonka">{transactions.mechanicTotalWorktime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.mechanicTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.mechanicTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.mechanicTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.mechanicTimeExceeded)}
</td>
                  <td className="colonka">{transactions.mechanicProblemHours}:00</td>
                  <td className="colonka">{transactions.planDate2}</td>
                  <td className="colonka">{transactions.factDate2}</td>
                  <td className="colonka"> {transactions.proverkaMehanikomStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenPodkluchenieAndProverkaMehanikom}<br/>{calculateDaysFromTime(transactions.timeBetweenPodkluchenieAndProverkaMehanikom)}</td>
                  <td className="colonka">{transactions.proverkaMehanikomEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaMehanikomWorkTime}<br/>Опция:{transactions.mechanicOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate3}</td>
                  <td className="colonka">{transactions.factDate3}</td>
                  <td className="colonka">{transactions.proverkaMehanikomStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка электронщиком</td>
                  <td className="colonka">{header.electronOperationNorm}:00</td>
                  <td className="colonka">{transactions.electronNorm}:00</td>
                  <td className="colonka">{transactions.electronTotalWorktime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.electronTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.electronTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.electronTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.electronTimeExceeded)}
</td>
                  <td className="colonka">{transactions.electronProblemHours}:00</td>
                  <td className="colonka">{transactions.planDate3}</td>
                  <td className="colonka">{transactions.factDate3}</td>
                  <td className="colonka">{transactions.proverkaElectronStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaMehanikomAndProverkaElectron}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaMehanikomAndProverkaElectron)}</td>
                  <td className="colonka">{transactions.proverkaElectronEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaElectronWorkTime}<br/>Опция{transactions.electronOptionWorktype}</span>
                  </td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate4}</td>
                  <td className="colonka">{transactions.factDate4}</td>
                  <td className="colonka">{transactions.proverkaElectronStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Проверка технологом</td>
                  <td className="colonka">{header.techOperationNorm}:00</td>
                  <td className="colonka">{transactions.techNorm}:00</td>
                  <td className="colonka">{transactions.techTotalWorktime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.techTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.techTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.techTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.techTimeExceeded)}
</td>
                  <td className="colonka">{transactions.techProblemHours}:00</td>
                  <td className="colonka">{transactions.planDate4}</td>
                  <td className="colonka">{transactions.factDate4}</td>
                  <td className="colonka">{transactions.proverkaTehnologomStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaElectronAndProverkaTehnologom}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaElectronAndProverkaTehnologom)}</td>
                  <td className="colonka">{transactions.proverkaTehnologomEmployee} <span className='no-break'><br/>Операция:{transactions.proverkaTehnologomWorkTime}<br/>Опция:{transactions.techOptionWorktype}</span></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate5}</td>
                  <td className="colonka">{transactions.factDate5}</td>
                  <td className="colonka">{transactions.proverkaTehnologomStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Выходной контроль</td>
                  <td className="colonka">{header.vihodNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.vihodControlWorkTime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.vihodControlTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.vihodControlTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.vihodControlTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.vihodControlTimeExceeded)}
</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.planDate5}</td>
                  <td className="colonka">{transactions.factDate5}</td>
                  <td className="colonka">{transactions.vihodControlStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenProverkaTehnologomAndVihodControl}<br/>{calculateDaysFromTime(transactions.timeBetweenProverkaTehnologomAndVihodControl)}</td>
                  <td className="colonka">{transactions.vihodControlEmployee} <span className='no-break'><br/>Операция:{transactions.vihodControlWorkTime}<br/>Опция:00.00.00</span></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.planDate6}</td>
                  <td className="colonka">{transactions.factDate6}</td>
                  <td className="colonka">{transactions.vihodControlStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka">Транспортное положение</td>
                  <td className="colonka">{header.transportNorm}:00</td>
                  <td className="colonka">0:00</td>
                  <td className="colonka">{transactions.transportPolozhenieWorkTime}</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.transportTimeExceeded === 'Нет данных'
          ? 'lightyellow'
                    : transactions.transportTimeExceeded === 'Контроль руководителя'  // Добавлено
            ? 'rgba(235, 67, 53)' 
          : getAdjustedPercentage(transactions.transportTimeExceeded) <= 0
            ? 'lightgreen'
            : '#FFB6B6',
    }}>
  {formatAdjustedPercentage(transactions.transportTimeExceeded)}
</td>
                  <td className="colonka">{transactions.complexProblemHours}:00</td>
                  <td className="colonka">{transactions.planDate6}</td>
                  <td className="colonka">{transactions.factDate6}</td>
                  <td className="colonka">{transactions.transportPolozhenieStartTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.timeBetweenVihodControlAndTransportPolozhenie}<br/>{calculateDaysFromTime(transactions.timeBetweenVihodControlAndTransportPolozhenie)}</td>
                  <td className="colonka">{transactions.transportPolozhenieEmployee} <span className='no-break'><br/>Операция:{transactions.transportPolozhenieWorkTime}<br/>Опция:00.00.00</span></td>
                  <td className="colonka">{transactions.planDate7}</td>
                  <td className="colonka">{transactions.factDate7}</td>
                  <td className="colonka">{transactions.transportPolozhenieStopTime}</td>
                </tr>

                <tr className="stroka">
                  <td className="colonka"></td>
                  <td className="colonka">Отклонение от плана (План ППП/Факт ППП)</td>
<td className="colonka"
    style={{
      backgroundColor:
        transactions.percentagePlanPpp === 'Нет данных'
          ? 'lightyellow'
          : getAdjustedPercentage(transactions.percentagePlanPpp) >= 0
            ? '#FFB6B6'
            : 'lightgreen',
    }} data-tooltip-id="percentage-plan-tooltip">
  {formatAdjustedPercentage(transactions.percentagePlanPpp)}
</td>
                  <td className="colonka">Сумма:</td>
                  <td className="colonka">{header.totalHeaderNorms}:00</td>
                  <td className="colonka">{transactions.totalProfessionNorms}:00</td>
                  <td className="colonka">{transactions.totalOperationsWorkTime}</td>
                  <td className="colonka"></td>
                  <td className="colonka">{transactions.totalProblemHours}:00</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka">Межоперационное ожидание</td>
                  <td className="colonka">{transactions.totalTimeBetweenOperations}</td>
                  <td className="colonka"></td>
                  <td className="colonka">Итоговое время цикла</td>
                  <td className="colonka" data-tooltip-id="full-tooltip">{transactions.totalTimeAll}<br/>{calculateDaysFromTime(transactions.totalTimeAll)}</td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                  <td className="colonka"></td>
                </tr>
              </tbody>      
              <br/>
            </React.Fragment>
          ))}
        </table>
    </div>
    </div>
  );
}

export default Table;