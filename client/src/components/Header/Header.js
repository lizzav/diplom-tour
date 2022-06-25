import React, { useContext } from "react";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import User from "../../assets/buttons/user.SVG";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
const Header = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  return (
    <header>
      <ul className="list">
        <li className="list__item">
          <p
            className={"logo"}
            onClick={() => {
              navigate("/");
            }}
          >
            findVacation
          </p>
        </li>

        <div className="list__search">
          <li className="list__item">
            <input className={"list__input"} placeholder={"Поиск"} />
          </li>
          {user.isAuth && (
            <li className="list__item">
              <img className={"img-icon user-icon"} src={User} />
              {user.users.email}
            </li>
          )}
        </div>
      </ul>
    </header>
  );
});

export default Header;
