import React, { useState } from "react";
import "./TravelsPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {TRAVEL_ROUTE} from "../../utils/const";
import Add from "../../assets/buttons/add.SVG";
import Edit from "../../assets/buttons/edit.SVG";
import Delete from "../../assets/buttons/delete.SVG";
import AppRouter from "../../components/AppRouter";
const TravelsPage = () => {
  const [visible, setVisible] = useState(false);
  let navigate = useNavigate();
  const travels = [
    {
      id: 1,
      name: "США"
    },
    {
      id: 2,
      name: "Канада"
    },
    {
      id: 3,
      name: "Мой отпуск"
    },
  ];
  return (
    <div className={"page"}>
      <div className={"travels__header"}>
        <h1>Путешествия</h1>

        <Button className={"blue-button"} onClick={() => setVisible(true)}>
          <img className={'img-icon'} src={Add}/>Создать новое путешествие
        </Button>
      </div>
      {travels.map(el=>
        <div className={"travels__item"} onClick={()=>navigate(TRAVEL_ROUTE+'/'+el.id)}>
          <h3>{el.name}</h3>
          <div><img className={'img-icon'} src={Edit}/><img className={'img-icon'} src={Delete}/></div>
        </div>)}

      <CreateTravel
        show={visible}
        onHide={() => {
          setVisible(false);
        }}
      />
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
};

export default TravelsPage;
