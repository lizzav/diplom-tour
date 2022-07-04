import React, {useContext, useState} from "react";
import "./AddSightInTravel.scss";
import {NavLink, useParams} from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import {createType} from "../../../http/deviceAPI";
import {createTravel, fetchTravel, putSight} from "../../../http/travelsAPI";
import {Context} from "../../../index";
const AddSightInTravel = ({ show, onHide }) => {
  const {travel}=useContext(Context)
  const [value, setValue] = useState(travel?.travels[0]?.id??0);

  const {id}=useParams()
  // setValue(travel.travels[0].id)
  const addSight = () => {
   putSight(value,{sightId:Number(id), visited: false,travelId:Number(value)  }).then(data => {
      fetchTravel().then(data=>{travel.setTravels(data);
      })
      onHide();
    }).catch(e=>{

      alert("возникла ошибка: "+e)
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Выберите поездку из списка
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            required
            placeholder={"Выберерте путешествие"}
                        value={value}
                        onChange={e => setValue(Number(e.target.value))} >
            {travel.travels.length && travel.travels.map(el=>
              <option value={el.id}>{el.name}</option>)}
          </Form.Select>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button className={'blue-button'} onClick={addSight}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSightInTravel;
