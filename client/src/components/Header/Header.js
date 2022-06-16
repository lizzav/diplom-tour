import React from "react";
import "./Header.scss";
import {Link, NavLink, useNavigate} from "react-router-dom";
import User from "../../assets/buttons/user.SVG"
const Header = () => {
  const navigate=useNavigate()
  return (
    <header>
      <ul className="list">
        <li className="list__item">
          <p className={'logo'} onClick={()=>{navigate('/')}}>findVacation</p>
        </li>

        <div className="list__search">
          <li className="list__item">
            <input className={"list__input"} placeholder={"Поиск"} />
          </li>
          <li className="list__item">
            <img className={'img-icon user-icon'} src={User}/>user@mail.ru</li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
