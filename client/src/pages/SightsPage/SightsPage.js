import React, {useContext, useEffect, useState} from "react";
import "./SightsPage.scss";
import { useNavigate } from "react-router-dom";
import { SIGHTS_ROUTE, TRAVEL_ROUTE } from "../../utils/const";
import {Context} from "../../index";
import {fetchSight} from "../../http/sightAPI";

import noPhoto from "../../assets/buttons/noPhoto.png";
import {observer} from "mobx-react-lite";
const SightsPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const {sight}=useContext(Context)
  useEffect(()=>{
    fetchSight().then(data=>{sight.setSights(data);
    })
  },[])

  let navigate = useNavigate();
  return (
    <>
      <div className={"travel__header"}>
        <h1>Достопримечательности</h1>
      </div>
      <div className={"sight"}>
      {sight.sights.length
      ?sight.sights.map(el => (
        <div className={"sight__item"} onClick={()=>navigate(SIGHTS_ROUTE+'/'+el.id)}>
          <img className={'sight__img'} src={el.photo[0]?.name?process.env.REACT_APP_API_URL+el.photo[0]?.name:noPhoto} />
          <h3  className={'sight__link'}>{el.name}</h3>
        </div>
      )):<span>ничего не найдено</span>
      }
      </div>
    </>
  );
});

export default SightsPage;
