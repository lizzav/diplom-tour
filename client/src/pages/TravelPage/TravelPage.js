import React, {useContext, useEffect, useState} from "react";
import "./TravelPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import {useNavigate, useParams} from "react-router-dom";
import { SIGHTS_ROUTE, TRAVEL_ROUTE } from "../../utils/const";
import Delete from "../../assets/buttons/delete.SVG";
import AppRouter from "../../components/AppRouter";
import {Context} from "../../index";
import {
  createTravel,
  deleteTravel,
  deleteTravelSight,
  fetchOneTravel,
  fetchTravel,
  updateTravelSight
} from "../../http/travelsAPI";
import noPhoto from "../../assets/buttons/noPhoto.png";
const TravelPage = () => {
  const [visible, setVisible] = useState(false);
  const [travel, setTravel] = useState(false);

  let navigate = useNavigate();

  const {id}=useParams()
  useEffect(()=>{
    fetchOneTravel(id).then(data=>{setTravel(data);
    })
  },[])
  const update =(event,el)=>{
    console.log(el,event.target.checked)
    console.log({id:el.id,sightId:el.sightId, travelId:el.travelId, visited:event.target.checked})

    updateTravelSight(el.id,{sightId:el.sightId, travelId:el.travelId, visited:event.target.checked}).then(() => {

      fetchOneTravel(id).then(data=>{setTravel(data);
      })
    });
  };
  const deleteSight=(el)=>{
    console.log(el,el.travelId)
    deleteTravelSight(el.id,{travelId:el.travelId}).then(() => {

      fetchOneTravel(id).then(data=>{setTravel(data);
      })
    });
  }
  return (<>
    {travel && <>
      <div className={"travel__header"}>
        <h1>{travel?.name}</h1>
      </div>
      <div className={"travel__item"}>
        {travel?.TravelSight.length ? travel.TravelSight.sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        }).map(el => (
          <>
            <input type={"checkbox"} onInput={(event)=>update(event, el)}  defaultChecked={el.visited}  />
            <img
              className={"travel__img travel__link"}
              src={
                el.sight.photo[0]?.name
                  ? process.env.REACT_APP_API_URL + el.sight.photo[0]?.name
                  : noPhoto
              }
              onClick={() => navigate(SIGHTS_ROUTE + "/" + el.sight.id)}
            />
            <h3
              className={"travel__link"}
              onClick={() => navigate(SIGHTS_ROUTE + "/" + el.sight.id)}
            >
              {el.sight.name}
              {el.sight.id}
            </h3>
            <p>{el.sight.address}</p>
            <div onClick={()=>deleteSight(el)}>
              <img className={"img-icon"} src={Delete} />
            </div>
          </>
        )):<span>Нет добавленных достопримечательностей</span>}
      </div>

      {travel?.TravelSight.length &&<Maps markers={travel} direction={true} />}
    </>
    }
    </>
  );
};

export default TravelPage;
