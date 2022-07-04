import React, { useContext, useEffect, useState } from "react";
// import { Modal } from "bootstrap";
import { Button, Form, Modal } from "react-bootstrap";
import {
  createBrand,
  createType,
  fetchBrand,
  fetchDevice,
  fetchTypes
} from "../../http/deviceAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import {createCountry, fetchCountry, updateCountry} from "../../http/countryesAPI";

const CreateCountry = observer(({ show, onHide, editCountry }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState(editCountry?.name??"");
  const [description, setDescription] = useState(editCountry?.description??"");
  const [lat, setLat] = useState(editCountry?.lat??0);
  const [lng, setLng] = useState(editCountry?.lng??0);
  const [validated, setValidated] = useState(false);

  useEffect(()=>{

    setName(editCountry?.name??'');
    setDescription(editCountry?.description??'');
    setLat(editCountry?.lat??0);
    setLng(editCountry?.lng??0)
  },[editCountry])
  const {country}=useContext(Context)
  const addBrand = event => {
    const form = event.currentTarget;
    console.log(event,form.checkValidity());

    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return
    }
    setValidated(true);
    if(country){
      updateCountry(editCountry.id,{ name, description,lat, lng }).then(data => {
        setName('');
        setDescription('');
        setLat(0);
        setLng(0)
        fetchCountry().then(data=>{country.setCountry(data);
        })
        onHide();
      });
      return;
    }
    createCountry({ name, description,lat, lng }).then(data => {
      setName('');
      setDescription('');
      setLat(0);
      setLng(0)
      fetchCountry().then(data=>{country.setCountry(data);
      })
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          {editCountry?'Изменить страну':'Добавить страну'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={addBrand}>
          <Form.Control
            className={"mb-1"}
            value={name}
            required
            onChange={e => setName(e.target.value)}
            placeholder={"Введите название страны"}
          />
          <Form.Control.Feedback type="invalid">
            Введите название страны.
          </Form.Control.Feedback>
          <Form.Control
            className={"mb-1"}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={"Введите название описание"}
          />
          <Form.Control
            className={"mb-1"}
            value={lat}
            required
            type={"number"}
            onChange={e => setLat(e.target.value)}
            placeholder={"Введите широту"}
          />
          <Form.Control.Feedback type="invalid">
            Введите широту.
          </Form.Control.Feedback>
          <Form.Control
            className={"mb-1"}
            value={lng}
            required
            type={"number"}
            onChange={e => setLng(e.target.value)}
            placeholder={"Введите долготу"}
          />
          <Form.Control.Feedback type="invalid">
            Введите долготу.
          </Form.Control.Feedback>
          <Button variant={"outline-danger"} onClick={onHide}>
            Закрыть
          </Button>
          <Button type="submit" variant={"outline-success"}>
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default CreateCountry;
