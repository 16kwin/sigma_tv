import React from "react";
import "../../styles/secondDiagramm.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell} from "recharts";
import { Tooltip as RechartsTooltip } from 'recharts';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function SecondDiagramm({ header }) {
  const isLoading = !header;
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        position: 'absolute',
        right: '-120px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'white',
        padding: '10px',
        border: '1px solid #D4EFDF',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minWidth: '100px',
        transition: 'opacity 0.3s ease',
        zIndex: 100
      }}>
        <div style={{ 
          position: 'absolute',
          left: '-6px',
          top: '50%',
          width: '0',
          height: '0',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid #D4EFDF',
          transform: 'translateY(-50%)'
        }}></div>
        <p style={{ 
          margin: 0, 
          color: '#5A5A5A',
          fontWeight: 'bold',
          fontSize: '12px'
        }}>{payload[0].payload.name}</p>
        <p style={{ 
          margin: '4px 0 0 0',
          color: '#7F7F7F',
          fontSize: '12px'
        }}>{`${payload[0].value} ч.`}</p>
      </div>
    );
  }
  return null;
};
  // 1. Первая круговая диаграмма (100% как у вас)
  const chartData = {
    labels: ["Операции просрочены", "Операции, выполненные в срок"],
    datasets: [{
      data: [header?.noOperationsCount || 0, header?.yesOperationsCount || 0],
      backgroundColor: ["#FFB6B6", "#D4EFDF"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom", align: "start"},
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((ctx.raw / total) * 100).toFixed(1);
            return `${ctx.label}: ${ctx.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  // 2. Вторая круговая диаграмма (100% как у вас)
  const chartData2 = {
    labels: [
      "Входной контроль", "Подключение", "Проверка механиком",
      "Проверка электронщиком", "Проверка механиком",
      "Выходной контроль", "Транспортное положение"
    ],
    datasets: [{
      data: [
        header?.vhodControlExceededCount || 0,
        header?.electricExceededCount || 0,
        header?.mechanicExceededCount || 0,
        header?.electronExceededCount || 0,
        header?.techExceededCount || 0,
        header?.vihodControlExceededCount || 0,
        header?.transportExceededCount || 0
      ],
      backgroundColor: ["#D4E6EF", "#FFD3D3", "#EFF7D4", "#FFD8B6", "#E8D4EF", "#D4EFE6", " #FFC4B8"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((ctx.raw / total) * 100).toFixed(1);
            return `${ctx.label}: ${ctx.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  // 3. Данные для гистограммы (ваши оригинальные данные)
  const barData = [
    { name: "Фонд рабочего времени", value: header?.totalHoursMounth || 0 },
    { name: "Выработка", value: header?.totalWorkTimeHoursFromEmployees || 0 }
  ];

  // Кастомная легенда (ваш оригинальный код)
  const renderCustomLegend = (data, isLoading) => {
    if (isLoading) return null;

    return (
      <div className="custom-legend">
        <ul className="legend-list">
          {data.labels.map((label, index) => (
            <li key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span className="legend-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="second-container">
      <div className="second-header">Производство</div>
      <div className="second-grid">
        
        {/* 1. Первая диаграмма (ваш оригинальный код) */}
        <div className="second-cell cell-1">
          ВЫПОЛНЕНИЕ В СРОК ОПЕРАЦИЙ ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <Pie data={chartData} options={options} />
            )}
          </div>
        </div>

        {/* 2. Вторая диаграмма (ваш оригинальный код) */}
        <div className="second-cell cell-2">
          ЭТАПЫ ПРОИЗВОДСТВА ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <Pie data={chartData2} options={options2} />
            )}
          </div>
          <div className="chart-wrapper">
            {renderCustomLegend(chartData2, isLoading)}
          </div>
        </div>

        {/* 3. Пустой блок (ваш оригинальный код) */}
        <div className="second-cell cell-3">
          ЗАГРУЗКА ПЕРСОНАЛА ОНЛАЙН<br/><br/>
        </div>

        {/* 4. Гистограмма - ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ */}
       {/* 4. Гистограмма - Выработка персонала (обновленная версия) */}
<div className="second-cell cell-4">
  ВЫРАБОТКА ПЕРСОНАЛА ЗА МЕСЯЦ
  <div className="chart-wrapper" style={{ 
    height: '85px', 
    minWidth: '250px',
    display: 'flex',
    alignItems: 'center',
     position: 'relative',
    gap: '10px'
  }}>
    {isLoading ? (
      <div className="loading-placeholder">Загрузка...</div>
    ) : (
      <>
        {/* Основной график с тултипом */}
        <ResponsiveContainer width="60%" height="100%">
          <BarChart
            data={[
              { name: "Фонд рабочего времени", value: header?.totalHoursMounth || 0 },
              { name: "Выработка", value: header?.totalWorkTimeHoursFromEmployees || 0 }
            ]}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis 
              dataKey="name" 
              tick={false}
              axisLine={false}
            />
            {/* Компонент Tooltip */}
            <RechartsTooltip
              content={<CustomTooltip />} // Кастомный стиль тултипа
              cursor={{ fill: 'rgba(0,0,0,0.05)' }} // Подсветка при наведении
            />
            <Bar 
              dataKey="value" 
              barSize={20}
            >
              <Cell fill="#D4EFDF" />
              <Cell fill="#D4E6EF" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Легенда (оставляем ваш текущий вариант) */}
        <div className="custom-legend" style={{
          paddingLeft: '10px',
          borderLeft: '1px solid #eee',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '100%'
          }}>
            <div style={{
              flexShrink: 0,
              width: '14px',
              height: '14px',
              backgroundColor: '#D4EFDF',
              marginRight: '8px',
              borderRadius: '2px'
            }} />
            <span style={{ whiteSpace: 'nowrap' }}>Фонд рабочего времени</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '100%'
          }}>
            <div style={{
              flexShrink: 0,
              width: '14px',
              height: '14px',
              backgroundColor: '#D4E6EF',
              marginRight: '8px',
              borderRadius: '2px'
            }} />
            <span style={{ whiteSpace: 'nowrap' }}>Выработка</span>
          </div>
        </div>
      </>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

export default SecondDiagramm;