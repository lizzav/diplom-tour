import React, { useContext, useEffect, useState } from "react";
import "./TravelsPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TRAVEL_ROUTE } from "../../utils/const";
import Add from "../../assets/buttons/add.SVG";
import Edit from "../../assets/buttons/edit.SVG";
import Delete from "../../assets/buttons/delete.SVG";
import AppRouter from "../../components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchCountry } from "../../http/countryesAPI";
import { createTravel, deleteTravel, fetchTravel } from "../../http/travelsAPI";
const TravelsPage = observer(() => {
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editElement, setEditElement] = useState({});
  let navigate = useNavigate();

  const { travel } = useContext(Context);
  useEffect(() => {
    fetchTravel().then(data => {
      travel.setTravels(data);
    });
  }, []);
  const edit = el => {
    console.log(el.id, el.name);
    setVisibleEdit(true);
    setEditElement(el);
  };
  const remove = id => {
    deleteTravel(id).then(data => {
      fetchTravel().then(data => {
        travel.setTravels(data);
      });
    });
  };
  return (
    <>
      <div className={"travels__header"}>
        <h1>Путешествия</h1>

        <Button className={"blue-button"} onClick={() => setVisible(true)}>
          <img className={"img-icon"} src={Add} />
          Создать новое путешествие
        </Button>
      </div>
      {travel.travels.length ? (
        travel.travels.map(el => (
          <div className={"travels__item"}>
            <h3 onClick={() => navigate(TRAVEL_ROUTE + "/" + el.id)}>
              {el.name}
            </h3>
            <div>
              <img className={"img-icon"} src={Edit} onClick={() => edit(el)} />
              <img
                className={"img-icon"}
                src={Delete}
                onClick={() => remove(el.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <span>Ничего не найдено</span>
      )}

      <CreateTravel
        show={visible}
        onHide={() => {
          setVisible(false);
        }}
      />
      <CreateTravel
        show={visibleEdit}
        element={editElement}
        onHide={() => {
          setVisibleEdit(false);
        }}
      />
    </>
  );
});

export default TravelsPage;
