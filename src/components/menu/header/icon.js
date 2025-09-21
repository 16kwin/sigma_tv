import "./icon.css"; 
import logo from "../../logo2.png"
function Icon() {   
  return(
  <div className="icon">
   <img src={logo} alt="Пример" className="image"></img>
   <div className="text-block">
    <h3 className="title">СИГМА</h3>
    <p className="subtitle">цифровое производство</p>
   </div>
  </div>
)}
  

export default Icon;