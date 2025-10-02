import React, { useState, useEffect, useMemo } from 'react';
import "../../styles/thirdDiagramm.css";

const getMonthName = (month) => {
  const monthNamesShort = ["Янв", "Фев", "Мар", "Апр", "Май", "Июнь", 
                         "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  return monthNamesShort[parseInt(month.substring(5, 7), 10) - 1] || '';
};

const getFullMonthName = (month) => {
  const monthNamesFull = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                         "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  return monthNamesFull[parseInt(month.substring(5, 7), 10) - 1] || '';
};

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

function ThirdDiagramm({ months }) {
  const [diagramType, setDiagramType] = useState('month');
  const [selectedKey, setSelectedKey] = useState(null);
  const [data, setData] = useState([]);

  const aggregateByMonth = (months) => {
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      monthlyData[`2025-${month}`] = { 
        transactionCount: 0,
        onTimeCount: 0,
        delayedCount: 0
      };
    }

    months.forEach(item => {
      if (item.month.startsWith('2025')) {
        monthlyData[item.month] = {
          transactionCount: item.transactionCount,
          onTimeCount: item.onTimeCount,
          delayedCount: item.delayedCount
        };
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      monthKey: month,
      month: getMonthName(month),
      fullMonth: getFullMonthName(month),
      ...data
    }));
  };

  const aggregateByYear = (months) => {
    const yearlyData = {
      '2025': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 },
      '2024': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 },
      '2023': { transactionCount: 0, onTimeCount: 0, delayedCount: 0 }
    };

    months.forEach(item => {
      const year = item.month.substring(0, 4);
      if (yearlyData[year]) {
        yearlyData[year].transactionCount += item.transactionCount;
        yearlyData[year].onTimeCount += item.onTimeCount;
        yearlyData[year].delayedCount += item.delayedCount;
      }
    });

    return Object.entries(yearlyData).map(([year, data]) => ({
      year,
      ...data
    }));
  };

  const handleItemClick = (item) => {
    try {
      const key = diagramType === 'month' ? item.monthKey : item.year;
      if (!key) {
        console.error('Key not found in item:', item);
        return;
      }

      console.log(`Clicked ${diagramType}:`, key);
      setSelectedKey(key);
    } catch (error) {
      console.error('Error in handleItemClick:', error);
    }
  };

  const performanceData = useMemo(() => {
    try {
      let targetData;
      
      if (selectedKey) {
        targetData = data.find(item => 
          diagramType === 'month' 
            ? item.monthKey === selectedKey 
            : item.year === selectedKey
        );
      }
      
      if (!targetData) {
        targetData = diagramType === 'month'
          ? data.find(item => item.monthKey === getCurrentMonthKey())
          : data[0];
      }

      return [
        { name: 'Закрыто в срок', value: targetData?.onTimeCount || 0 },
        { name: 'Закрыто не в срок', value: targetData?.delayedCount || 0 }
      ];
    } catch (error) {
      console.error('Error calculating performanceData:', error);
      return [
        { name: 'Закрыто в срок', value: 0 },
        { name: 'Закрыто не в срок', value: 0 }
      ];
    }
  }, [selectedKey, data, diagramType]);

  const bottomChartLabel = useMemo(() => {
    if (selectedKey) {
      return diagramType === 'month'
        ? `Закрытие транзакций за: ${getFullMonthName(selectedKey)}`
        : `Закрытие транзакций за: ${selectedKey} год`;
    }
    return diagramType === 'month'
      ? `Закрытие транзакций за: ${getFullMonthName(getCurrentMonthKey())}`
      : `Закрытие транзакций за: ${data[0]?.year || '2025'} год`;
  }, [selectedKey, diagramType, data]);

  useEffect(() => {
    try {
      const newData = diagramType === 'month' 
        ? aggregateByMonth(months) 
        : aggregateByYear(months);
      setData(newData);
      
      const defaultKey = diagramType === 'month' 
        ? getCurrentMonthKey() 
        : '2025';
      setSelectedKey(defaultKey);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }, [diagramType, months]);

  return (
    <div className="third-container">
      <div className="third-header">
        Загрузка производства
      </div>

      <div className="volume-and-buttons">
        <div className="volume-text">ОБЪЕМ ТРАНЗАКЦИЙ</div>
        <div className="diagram-buttons">
          <div 
            className={`toggle-option ${diagramType === 'month' ? 'active' : ''}`}
            onClick={() => setDiagramType('month')}
          >
            <span className="toggle-circle"></span>
            <span>Месяц</span>
          </div>
          <div 
            className={`toggle-option ${diagramType === 'year' ? 'active' : ''}`}
            onClick={() => setDiagramType('year')}
          >
            <span className="toggle-circle"></span>
            <span>Год</span>
          </div>
        </div>
      </div>

      <div className="third-main-block">
        {/* Заглушка для верхней диаграммы - объем транзакций */}
        <div className="data-stub-top">
          <div className="stub-header">
            {diagramType === 'month' ? 'Объем транзакций по месяцам' : 'Объем транзакций по годам'}
          </div>
          <div className="stub-items-container">
            {data.map((item, index) => (
              <div 
                key={index}
                className={`stub-item ${selectedKey === (diagramType === 'month' ? item.monthKey : item.year) ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="stub-label">
                  {diagramType === 'month' ? item.month : `${item.year} год`}
                </div>
                <div className="stub-value">
                  {item.transactionCount} транзакций
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-chart-label">
          {bottomChartLabel}
        </div>

        {/* Заглушка для нижней диаграммы - производительность */}
        <div className="performance-chart-container">
          <div className="data-stub-bottom">
            <div className="performance-stats">
              <div className="performance-item">
                <div className="performance-color success"></div>
                <div className="performance-info">
                  <span className="performance-label">Транзакции в срок</span>
                  <span className="performance-value">{performanceData[0].value}</span>
                </div>
              </div>
              <div className="performance-item">
                <div className="performance-color error"></div>
                <div className="performance-info">
                  <span className="performance-label">Транзакции с задержкой</span>
                  <span className="performance-value">{performanceData[1].value}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="performance-legend3">
            <div className="legend-item3">
              <div className="legend-color3" style={{ background: '#D4EFDF' }} />
              <span>Транзакции в срок ({performanceData[0].value})</span>
            </div>
            <div className="legend-item3">
              <div className="legend-color3" style={{ background: '#FFB6B6' }} />
              <span>Транзакции с задержкой ({performanceData[1].value})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdDiagramm;