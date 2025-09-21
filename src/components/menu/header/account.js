import React, { useState } from "react";
import "./account.css";
import user from "../../User.png";

function Account({ onLogout }) {  // Добавляем пропс onLogout
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="account-container">
      <div 
        className="account-button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <img src={user} alt="Account" className="account-icon" />
        <span>User ▼</span>
      </div>

      {isOpen && (
        <div 
          className="dropdown-menu"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button 
            className="menu-item exit-button"
            onClick={handleLogout}  // Добавляем обработчик клика
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;