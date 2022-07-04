import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CITES_ROUTE,
  COUNTRIES_ROUTE,
  DEVICE_ROUTE, ERROR_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
  SIGHTS_ROUTE,
  TRAVEL_ROUTE
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
import CountriesPage from "../pages/CountriesPage";
import CountryPage from "../pages/CountryPage";
import CitiesPage from "../pages/CitiesPage";
import CityPage from "../pages/CityPage";
import ErrorPage from "../pages/ErrorPage";

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
      <Route
        path={LOGIN_ROUTE}
        element={user.isAuth ? <Navigate to="/" /> : <Auth />}
        exact
      />
      <Route
        path={REGISTER_ROUTE}
        element={user.isAuth ? <Navigate to="/" /> : <Auth />}
        exact
      />
      {/*<Route path={SHOP_ROUTE} element={<Shop />} exact />*/}
      <Route path={DEVICE_ROUTE + "/:id"} element={<DevicePage />} exact />
      <Route path="*" element={<Navigate replace to="/" />} />

      <Route path={MAIN_ROUTE} element={<MainPage />} exact />
      <Route path={TRAVEL_ROUTE} element={<TravelsPage />} exact />
      <Route path={TRAVEL_ROUTE + "/:id"} element={<TravelPage />} exact />

      <Route path={COUNTRIES_ROUTE + "/:id"} element={<CountryPage />} exact />
      <Route path={COUNTRIES_ROUTE} element={<CountriesPage />} exact />
      <Route path={SIGHTS_ROUTE + "/:id"} element={<SightPage />} exact />
      <Route path={SIGHTS_ROUTE} element={<SightsPage />} exact />
      <Route path={CITES_ROUTE + "/:id"} element={<CityPage />} exact />
      <Route path={CITES_ROUTE} element={<CitiesPage />} exact />
      <Route path={ERROR_ROUTE} element={<ErrorPage />} exact />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
