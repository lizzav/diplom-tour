import React, { useContext } from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import Home from "../../assets/buttons/home.svg";
import star from "../../assets/buttons/star.SVG";
import countries from "../../assets/buttons/countries.SVG";
import city from "../../assets/buttons/city.SVG";
import sights from "../../assets/buttons/plases.SVG";
import settings from "../../assets/buttons/settings.SVG";
import logout from "../../assets/buttons/logout.SVG";
import edit from "../../assets/buttons/edit.SVG";
import login from "../../assets/buttons/login.SVG";
import { Context } from "../../index";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
const NavBar =observer( () => {
  const { user } = useContext(Context);

  const logOut=()=>{
    localStorage.setItem('token','')
    user.setIsAuth(false);
    user.setUser({})
  }

  return (
    <nav className={"menu"}>
      <NavLink className={"menu__item"} to={"/"}>
        <img className={"img-icon"} src={Home} />
        Главная
      </NavLink>
      {user.isAuth && (
        <NavLink className={"menu__item"} to={"/travels"}>
          <img className={"img-icon"} src={star} />
          Поездки
        </NavLink>
        )
      }

      <NavLink className={"menu__item"} to={"/countries"}>
        <img className={"img-icon"} src={countries} />
        Страны
      </NavLink>
      <NavLink className={"menu__item"} to={"/cites"}>
        <img className={"img-icon"} src={city} />
        Города
      </NavLink>
      <NavLink className={"menu__item"} to={"/sights"}>
        <img className={"img-icon"} src={sights} />
        Места
      </NavLink>
      <NavLink className={"menu__item"} to={"/settings"}>
        <img className={"img-icon"} src={settings} />
        Настройки
      </NavLink>
      {user.users.role==='ADMIN' && (
        <NavLink className={"menu__item"} to={"/errors"}>
          <img className={"img-icon"} src={edit} />
          Обращения
        </NavLink>
      )}
      {user.isAuth ? (
        <div className={"menu__item"}
             onClick={logOut} >
          <img className={"img-icon"} src={logout}/>
          Выйти
        </div>
      ) : (
        <NavLink className={"menu__item"} to={"/login"}>
          <img className={"img-icon"} src={login} />
          Войти
        </NavLink>
      )}
    </nav>
  );
});

export default NavBar;
