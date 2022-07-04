import React, { useContext, useState } from "react";
import "./AddError.scss";
import { NavLink, useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../../http/deviceAPI";
import { createTravel, fetchTravel, putSight } from "../../../http/travelsAPI";
import { Context } from "../../../index";
import { addReview } from "../../../http/sightAPI";
import {addError} from "../../../http/errorAPI";
const AddError = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { id } = useParams();
  // setValue(travel.travels[0].id)
  const createError = () => {
    if (!name) {
      setError("Не заполнено название");
    }
addError({
  email, name, description: value, verified: false
}).then(
  onHide()
)
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Создание предложения
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            required
            placeholder={"Введите email"}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            required
            placeholder={"Введите название"}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            required
            placeholder={"Введите отзыв"}
            value={value}
            onChange={e => setValue(e.target.value)}
            as="textarea"
          />
        </Form>
        {!name ? <span>{error}</span> : <span></span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button className={"blue-button"} onClick={createError}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddError;
