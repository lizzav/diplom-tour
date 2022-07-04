import React, { useContext, useEffect, useState } from "react";
import "./CitiesPage.scss";
import { useNavigate } from "react-router-dom";
import {
  CITES_ROUTE,
  COUNTRIES_ROUTE,
  SIGHTS_ROUTE,
  TRAVEL_ROUTE
} from "../../utils/const";
import { Context } from "../../index";
import { fetchSight } from "../../http/sightAPI";

import noPhoto from "../../assets/buttons/noPhoto.png";
import { observer } from "mobx-react-lite";
import { fetchCountry } from "../../http/countryesAPI";
import { fetchCities } from "../../http/cityAPI";
const CitiesPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const { city } = useContext(Context);
  useEffect(() => {
    fetchCities().then(data => {
      city.setCities(data);
    });
  }, []);
  let navigate = useNavigate();
  return (
    <>
      <div className={"travel__header"}>
        <h1>Города</h1>
      </div>
      <div className={"sight"}>
        {city.cities.length ?
          city.cities.map(el => (
            <div
              className={"sight__item"}
              onClick={() => navigate(CITES_ROUTE + "/" + el.id)}
            >
              <img
                className={"sight__img"}
                src={
                  el.photo[0]?.name
                    ? process.env.REACT_APP_API_URL + el.photo[0]?.name
                    : noPhoto
                }
              />
              <h3 className={"sight__link"}>{el.name}</h3>
            </div>
          )):<span>ничего не найдено</span>}
      </div>
    </>
  );
});

export default CitiesPage;
