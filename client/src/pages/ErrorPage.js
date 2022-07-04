import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {check} from "../http/userAPI";
import {getErrors, updateError} from "../http/errorAPI";
import {fetchOneTravel, updateTravelSight} from "../http/travelsAPI";
const ErrorPage = () => {
const [error, setError]=useState([])
useEffect(() => {
  getErrors()
    .then(data => {
      setError(data)
    })
}, []);

  const update =(event,el)=>{
    console.log(el,event.target.checked)
    console.log({id:el.id,sightId:el.sightId, travelId:el.travelId, visited:event.target.checked})

    updateError(el.id,{name:el.name, description:el.description,email:el.email, verified:event.target.checked}).then(() => {

      getErrors()
        .then(data => {
          setError(data)
        })
    });
  };
  return  <Row className={"d-flex flex-column m-3"}>
    <h1>Обращение</h1>
    {error.map((info, index) => (
      <Row className={"m-3 d-flex flex-column"}
        key={info.id}
        style={{
          background: !info.verified ? "lightgray" : "transparent"
        }}
      >

        <span>  <input type={"checkbox"} onInput={(event)=>update(event, info)}  defaultChecked={info.verified}  />
email: {info.email}</span>
        <span>
        Название: {info.name}</span>
        <span>
        Описание: {info.description}
      </span>
      </Row>
    ))}
  </Row>;
};

export default ErrorPage;
