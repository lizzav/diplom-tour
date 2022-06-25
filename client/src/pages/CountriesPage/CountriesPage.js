import React, {useContext, useEffect, useState} from "react";
import "./CountriesPage.scss";
import { useNavigate } from "react-router-dom";
import {COUNTRIES_ROUTE, SIGHTS_ROUTE, TRAVEL_ROUTE} from "../../utils/const";
import {Context} from "../../index";
import {fetchSight} from "../../http/sightAPI";

import noPhoto from "../../assets/buttons/noPhoto.png";
import {observer} from "mobx-react-lite";
import {fetchCountry} from "../../http/countryesAPI";
const CountriesPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const {country}=useContext(Context)
  useEffect(()=>{
    fetchCountry().then(data=>{country.setCountry(data);
      console.log(data)
    })
  },[])

  let navigate = useNavigate();
  return (
    <div className={"page"}>
      <div className={"travel__header"}>
        <h1>Достопримечательности</h1>
      </div>
      <div className={"sight"}>
      {country.countries.length
      &&country.countries.map(el => (
        <div className={"sight__item"} onClick={()=>navigate(COUNTRIES_ROUTE+'/'+el.id)}>
          <img className={'sight__img'} src={el.photo[0]?.name?process.env.REACT_APP_API_URL+el.photo[0]?.name:noPhoto} />
          <h3  className={'sight__link'}>{el.name}</h3>
        </div>
      ))
      }
      </div>
    </div>
  );
});

export default CountriesPage;
