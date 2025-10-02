import React, { useMemo } from 'react';
import "../../styles/depo.css";

function Depo({ data }) {
  const transactionsWithDividers = useMemo(() => {
    if (!data?.transactions) return [];
    return data.transactions;
  }, [data]);

  if (!data?.transactions) {
    return <div className="depo-loading">Загрузка данных...</div>;
  }

  return (
    <div className="depo-wrapper">
      <div className="depo-main-header">Депо транзакций</div>
      <div className="depo-container">
        <div className="depo-table-header">
          <div className="depo-cell">Транзакция</div>
          <div className="depo-cell">Входной контроль</div>
          <div className="depo-cell">Подключение</div>
          <div className="depo-cell">Проверка механиком</div>
          <div className="depo-cell">Проверка электронщиком</div>
          <div className="depo-cell">Проверка технологом</div>
          <div className="depo-cell">Выходной контроль</div>
          <div className="depo-cell">Транспортное</div>
        </div>
        <div className="depo-table-body-wrapper">
          <div className="depo-table-body">
            {transactionsWithDividers.map((item, index) => (
              <div key={`${item.transaction}-${index}`} className="depo-row">
                <div className="depo-cell">{item.transaction}</div>
                <div className={`depo-cell ${getStatusClass(item.vhodControlTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.electricTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.mechanicTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.electronTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.techTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.vihodControlTimeExceeded)}`}></div>
                <div className={`depo-cell ${getStatusClass(item.transportTimeExceeded)}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="depo-legend">
        <div className="legend-item2">
          <div className="legend-color2 success"></div>
          <span>Выполнено в срок</span>
        </div>
        <div className="legend-item2">
          <div className="legend-color2 error"></div>
          <span>Просрочено</span>
        </div>
         <div className="legend-item2">
          <div className="legend-color2 control"></div>
          <span>Контроль руководителя</span>
        </div>
      </div>
    </div>
  );
}

function getStatusClass(status) {
  if (status === 'да') return 'success';
  if (status === 'Нет данных') return 'white';
  if (status === 'Контроль руководителя') return 'control';
  return 'error';
}

export default Depo;