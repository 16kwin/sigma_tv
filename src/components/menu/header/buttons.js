import "./button.css";
import osnova from "../../Основная.png";
import doska from "../../Доска.png";
import virab from "../../Выработка.png";
import info from "../../О программе.png";

function Buttons({ setActiveTab }) {
  return (
    <div className="buttons">
      {/* Кнопка 1 */}
      <button 
        className="custom-button"
        onClick={() => setActiveTab('body')}
      >
        <img src={osnova} alt="Icon 1" />
        <span>Основная</span>
      </button>

      {/* Кнопка 2 */}
      <button 
        className="custom-button"
        onClick={() => setActiveTab('table')}
      >
        <img src={doska} alt="Icon 2" />
        <span>Доска производства</span>
      </button>

      {/* Кнопка 3 */}
      <button 
        className="custom-button"
        onClick={() => setActiveTab('production')}
      >
        <img src={virab} alt="Icon 3" />
        <span>Выработка</span>
      </button>

      {/* Кнопка 5 */}
      <button 
        className="custom-button"
        onClick={() => setActiveTab('info')}
      >
        <img src={info} alt="Icon 5" />
        <span>О программе</span>
      </button>
    </div>
  );
}

export default Buttons;