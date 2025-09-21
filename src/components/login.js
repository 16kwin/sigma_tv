import React, { useState } from "react";
import "../styles/login.css"; 
import logo from "./logo.png"
import Menu from "./menu"

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  function Processing(e) {
    e.preventDefault();
    if (login === "admin" && password === "Tuduta95") {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      alert("Неверный логин или пароль!");
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Устанавливаем флаг в false
    setIsLoggedIn(false); // Обновляем состояние
  };

  if (isLoggedIn) {
    return <Menu onLogout={handleLogout} />; // Передаем обработчик в Menu
  }

  return (
    <div className="login-container">
      <img 
        src={logo} 
        alt="СИГМА" 
        className="login-logo"
      />
      <h2 className="login-title">СИГМА</h2>
      <p className="login-subtitle">Цифровое производство</p>
      <form onSubmit={Processing}>
        <div>
          <input 
            type="text" 
            placeholder="Логин"
            className="login-input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Пароль"
            className="login-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="login-button">
          Вход
        </button>
      </form>
    </div>
  );
};

export default Login;