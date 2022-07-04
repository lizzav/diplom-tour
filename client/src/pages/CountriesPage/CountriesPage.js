import React, {useContext, useEffect, useState} from "react";
import "./CountriesPage.scss";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {COUNTRIES_ROUTE, SIGHTS_ROUTE, TRAVEL_ROUTE} from "../../utils/const";
import {Context} from "../../index";
import {fetchSight} from "../../http/sightAPI";

import noPhoto from "../../assets/buttons/noPhoto.png";
import {observer} from "mobx-react-lite";
import {fetchCountry} from "../../http/countryesAPI";
import {Button} from "react-bootstrap";
import Add from "../../assets/buttons/add.SVG";
import AddError from "../../components/modals/AddError";
import CreateCountry from "../../components/modals/CreateCountry";
const CountriesPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const {country,user}=useContext(Context)
  useEffect(()=>{
    fetchCountry().then(data=>{country.setCountry(data);
    })
  },[])

  let navigate = useNavigate();
  return (
    <>
      <div className={"travel__header"}>
        <h1>Страны</h1>

        {user.users.role==='ADMIN'&&<Button className={"blue-button"} onClick={() => setVisible(true)}>
          <img className={"img-icon"} src={Add} />
          Создать новую страну
        </Button>}
      </div>
      <div className={"sight"}>
      {country.countries.length
      ? country.countries.map(el => (
        <div className={"sight__item"} onClick={()=>navigate(COUNTRIES_ROUTE+'/'+el.id)}>
          <img className={'sight__img'} src={el.photo[0]?.name?process.env.REACT_APP_API_URL+el.photo[0]?.name:noPhoto} />
          <h3  className={'sight__link'}>{el.name}</h3>
        </div>
      )):<span>ничего не найдено</span>
      }
      </div>

      <CreateCountry
        show={visible}
        onHide={() => {
          setVisible(false);
        }}
      />
    </>
  );
});

export default CountriesPage;
