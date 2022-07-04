import React, {useContext, useEffect, useState} from "react";
import "./CreateTravel.scss";
import { NavLink } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import {createType} from "../../../http/deviceAPI";
import {createTravel, fetchTravel, updateTravel} from "../../../http/travelsAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
const CreateTravel = observer(({ show, onHide,element }) => {

  const [value, setValue] = useState('');
useEffect(()=>setValue(element?.name),[element])
  const {travel}=useContext(Context)
  const addTravel = () => {
    console.log(element.id)
    if(!element.id){
      createTravel({ name: value }).then(data => {
        setValue("");
        fetchTravel().then(data=>{travel.setTravels(data);
        })
        onHide();
      });
      return
    }

    updateTravel(element.id,{ name: value }).then(data => {
      setValue("");
      fetchTravel().then(data=>{travel.setTravels(data);
      })
      onHide();
  })
};
  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          {
            element?.id?"Изменить путешестие":"Добавить путешестие"
        }

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите название путеществия"}
                        value={value}
                        onChange={e => setValue(e.target.value)} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button className={'blue-button'} onClick={addTravel}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTravel;
