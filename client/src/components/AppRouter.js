import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE, MAIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE, SIGHTS_ROUTE, TRAVEL_ROUTE
} from "../utils/const";
import Admin from "../pages/Admin";
import Basket from "../pages/Basket";
import Shop from "../pages/Shop";
import DevicePage from "../pages/DevicePage";
import { Context } from "../index";
import NavBar from "./NavBar/index";
import MainPage from "../pages/MainPage";
import TravelPage from "../pages/TravelPage";
import TravelsPage from "../pages/TravelsPage";
import SightsPage from "../pages/SightsPage";
import SightPage from "../pages/SightPage";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
      <Routes>
        <Route
          path={ADMIN_ROUTE}
          element={user.isAuth ? <Admin /> : <Navigate to="/" />}
          exact
        />
        <Route
          path={BASKET_ROUTE}
          element={user.isAuth ? <Basket /> : <Navigate to="/" />}
          exact
        />
        <Route path={LOGIN_ROUTE} element={<Auth />} exact />
        <Route path={REGISTER_ROUTE} element={<Auth />} exact />
        <Route path={SHOP_ROUTE} element={<Shop />} exact />
        <Route path={DEVICE_ROUTE + "/:id"} element={<DevicePage />} exact />
        <Route path="*" element={<Navigate replace to="/" />} />


        {/*<Route*/}
        {/*  path={MAIN_ROUTE}*/}
        {/*  element={<MainPage />}*/}
        {/*  exact*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={TRAVEL_ROUTE}*/}
        {/*  element={<TravelsPage />}*/}
        {/*  exact*/}
        {/*/>*/}
        {/*<Route path={TRAVEL_ROUTE + "/:id"} element={<TravelPage />} exact />*/}
        {/*<Route*/}
        {/*  path={SIGHTS_ROUTE}*/}
        {/*  element={<SightsPage />}*/}
        {/*  exact*/}
        {/*/>*/}
        {/*<Route path={SIGHTS_ROUTE + "/:id"} element={<SightPage />} exact />*/}
        {/*<Route path="*" element={<Navigate replace to="/" />} />*/}
      </Routes>
  );
};

export default AppRouter;
