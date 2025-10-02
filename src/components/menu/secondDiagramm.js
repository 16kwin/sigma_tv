import React from "react";
import "../../styles/secondDiagramm.css";

function SecondDiagramm({ header }) {
  const isLoading = !header;

  return (
    <div className="second-container">
      <div className="second-header">Производство</div>
      <div className="second-grid">
        
        {/* 1. Первая диаграмма - заменена на заглушку */}
        <div className="second-cell cell-1">
          ВЫПОЛНЕНИЕ В СРОК ОПЕРАЦИЙ ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <div className="data-stub">
                <div className="stub-item">
                  <span className="stub-label">Операции просрочены:</span>
                  <span className="stub-value">{header?.noOperationsCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Операции выполнены в срок:</span>
                  <span className="stub-value">{header?.yesOperationsCount || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Вторая диаграмма - заменена на заглушку */}
        <div className="second-cell cell-2">
          ЭТАПЫ ПРОИЗВОДСТВА ПО ТРАНЗАКЦИЯМ В РАБОТЕ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <div className="data-stub">
                <div className="stub-item">
                  <span className="stub-label">Входной контроль:</span>
                  <span className="stub-value">{header?.vhodControlExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Подключение:</span>
                  <span className="stub-value">{header?.electricExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Проверка механиком:</span>
                  <span className="stub-value">{header?.mechanicExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Проверка электронщиком:</span>
                  <span className="stub-value">{header?.electronExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Проверка технологом:</span>
                  <span className="stub-value">{header?.techExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Выходной контроль:</span>
                  <span className="stub-value">{header?.vihodControlExceededCount || 0}</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Транспортное положение:</span>
                  <span className="stub-value">{header?.transportExceededCount || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Пустой блок */}
        <div className="second-cell cell-3">
          ЗАГРУЗКА ПЕРСОНАЛА ОНЛАЙН<br/><br/>
        </div>

        {/* 4. Гистограмма - заменена на заглушку */}
        <div className="second-cell cell-4">
          ВЫРАБОТКА ПЕРСОНАЛА ЗА МЕСЯЦ
          <div className="chart-wrapper">
            {isLoading ? (
              <div className="loading-placeholder">Загрузка...</div>
            ) : (
              <div className="data-stub">
                <div className="stub-item">
                  <span className="stub-label">Фонд рабочего времени:</span>
                  <span className="stub-value">{header?.totalHoursMounth || 0} ч.</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">Выработка:</span>
                  <span className="stub-value">{header?.totalWorkTimeHoursFromEmployees || 0} ч.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondDiagramm;