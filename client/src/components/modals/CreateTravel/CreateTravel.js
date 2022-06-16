import React from "react";
import "./CreateTravel.scss";
import { NavLink } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
const CreateTravel = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Добавить путешестие
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите название путеществия"} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button className={'blue-button'} onClick={onHide}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTravel;
