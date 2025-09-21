import React from "react";
import { Tooltip } from "react-tooltip";
import "../../styles/firstDiagramm.css";
import "react-tooltip/dist/react-tooltip.css";

// Добавляем кастомные стили для тултипов прямо в компоненте
const tooltipStyles = `
  .custom-tooltip {
    z-index: 9999 !important;
    opacity: 0.95 !important;
    transition: opacity 0.2s ease-out, transform 0.2s ease-out !important;
  }
  .custom-tooltip.show {
    opacity: 1 !important;
    transform: translateX(5px) !important;
  }
`;

function FirstDiagramm({ header }) {
  const isLoading = !header;

  const formatNumber = (number) => {
    if (number === null || number === undefined) {
      return "Нет данных";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="firstdiagramm">
      <style>{tooltipStyles}</style> {/* Инжектим кастомные стили */}

      <div className="diagram-header">Текущие показатели (за транзакции в работе)</div>
      <div className="blocks-wrapper">
        {/* Блок 1 */}
        <div 
          className="block block1" 
          data-tooltip-id="block1-tooltip"
          data-tooltip-place="right"
        >
          Транзакций в работе
          <br />
          <span>
            {isLoading ? "Загрузка..." : formatNumber(header.totalTransactionsInWork)}
          </span>
        </div>
        <Tooltip 
          id="block1-tooltip" 
          className="custom-tooltip"
          effect="solid"
          delayShow={300}
          content="Количество транзакций в работе" 
        />

        {/* Блок 2 */}
        <div 
          className="block block2" 
          data-tooltip-id="block2-tooltip"
          data-tooltip-place="right"
        >
          Выработано производством
          <br />
          <span>
            {isLoading ? (
              "Загрузка..."
            ) : (
              <>
                <span
                  style={{
                    color:
                      header.totalOperationsWorkTimeSum > header.planPppSum ? "rgba(235, 67, 53)" : "inherit",
                  }}
                >
                  {formatNumber(header.totalOperationsWorkTimeSum)}
                </span>
                {" / "}
                {formatNumber(header.planPppSum)}
              </>
            )}
          </span>
          часов
        </div>
        <Tooltip 
          id="block2-tooltip" 
          className="custom-tooltip"
          effect="solid"
          content="Сумма фактического времени за транзакции/Сумма нормативного времени за транзакции" 
        />

        {/* Остальные блоки (аналогично) */}
        {/* Блок 6 */}
        <div 
          className="block block6" 
          data-tooltip-id="block6-tooltip"
          data-tooltip-place="right"
        >
          Количество отклонений
          <br />
          <span>
            {isLoading ? "Загрузка..." : formatNumber(header.noOperationsCount)}
          </span>
        </div>
        <Tooltip 
          id="block6-tooltip" 
          className="custom-tooltip"
          effect="solid"
          content="Количество операций, выполненных не в срок (отклонений)" 
        />

        {/* Блок 4 */}
        <div 
          className="block block4" 
          data-tooltip-id="block4-tooltip"
          data-tooltip-place="right"
        >
          Время межоперационного ожидания
          <br />
          <span>
            {isLoading
              ? "Загрузка..."
              : formatNumber(header.totalTimeBetweenOperationsHours)}
          </span>
          часов
        </div>
        <Tooltip 
          id="block4-tooltip" 
          className="custom-tooltip"
          effect="solid"
          content="Сумма времени межоперационных ожиданий" 
        />

        {/* Блок 5 */}
        <div 
          className="block block5" 
          data-tooltip-id="block5-tooltip"
          data-tooltip-place="right"
        >
          <div className="block5-header">Отклонение от плана</div>
          <div className="block5-content">
            <span className="left-part">
              <span>
                {isLoading ? "Загрузка..." : header?.planPppDiffPercentage}%
              </span>
            </span>
            <span className="right-part">
              <span>{isLoading ? "Загрузка..." : header?.planPppDiff}</span>
              часов
            </span>
          </div>      
        </div>
        <Tooltip 
          id="block5-tooltip" 
          className="custom-tooltip"
          effect="solid"
          content=<div>((Сумма фактического времени за транзакции/Сумма нормативного времени за транзакции)*100-100)%<br/>Сумма фактического времени за транзакции - Сумма нормативного времени за транзакции</div>
        />

        {/* Блок 7 */}
        <div 
          className="block block7" 
          data-tooltip-id="block7-tooltip"
          data-tooltip-place="right"
        >
          Суммарное время устранений замечаний
          <br />
          <span>
            {isLoading
              ? "Загрузка..."
              : formatNumber(header.totalProblemHours)}
          </span>
          часов
        </div>
        <Tooltip 
          id="block7-tooltip" 
          className="custom-tooltip"
          effect="solid"
          content=" Суммарное время устранений замечаний по транзакциям"
        />
      </div>

      {/* Блок 3 (широкий) */}
      <div 
        className="block block3 block-wide" 
        data-tooltip-id="block3-tooltip"
        data-tooltip-place="right"
      >
        Суммарное итоговое время циклов
        <br />
        <span>
          {isLoading ? "Загрузка..." : formatNumber(header.totalTimeAllHours)}
        </span>
        часов
      </div>
      <Tooltip 
        id="block3-tooltip" 
        className="custom-tooltip"
        effect="solid"
        content="Сумма фактического времени за транзакции+сумма времени межоперационных ожиданий-суммарное время устранений замечаний" 
      />
    </div>
  );
}

export default FirstDiagramm;