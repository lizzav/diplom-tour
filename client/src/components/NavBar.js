import React, { useContext } from "react";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Button, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE
} from "../utils/const";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  let navigate = useNavigate();
  const { user } = useContext(Context);
  const logOut=()=>{
    user.setIsAuth(false);
    user.setUser({})
    localStorage.setItem('token','')
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Лого
        </NavLink>
        {user.isAuth ? (
          <Nav className="me-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              className="ml-2"
              onClick={logOut}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
