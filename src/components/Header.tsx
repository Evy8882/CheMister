import { Link } from "react-router-dom";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/Logos/4.png";

function Header(){
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <header className="main-header">
            <img src={logo} alt="CheMister" className="header-logo" />
            <button className="menu-btn" onClick={()=>{menuRef.current?.classList.add("active")}}><FontAwesomeIcon icon={faBars} /></button>
            <div className="header-links" ref={menuRef}>
            <button className="close-btn" onClick={() => menuRef.current?.classList.remove("active")}>X</button>
            <Link to="/">Ínicio</Link>
            <Link to="/periodic-table">Tabela Períodica</Link>
            <Link to="/molar-mass-calculator">Calculadora de massa molar</Link>
            <Link to="/">Balanceador de equações</Link>
            <Link to="/">Simulador de pH</Link>
            </div>
        </header>
    )
}
export default Header;