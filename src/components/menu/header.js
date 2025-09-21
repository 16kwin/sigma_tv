import "../../styles/header.css"; 
import Account from "./header/account";
import Icon from "./header/icon";
import Buttons from "./header/buttons";
function Header( { onLogout, setActiveTab  }) {   
  return(
  <div className="header">
  <Icon/>
  <Buttons setActiveTab={setActiveTab} />
  <Account onLogout={onLogout}/>
  </div>
)}
  

export default Header;