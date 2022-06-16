import React, {useContext, useEffect, useState} from "react";
// import { Modal } from "bootstrap";
import { Button, Form, Modal } from "react-bootstrap";
import {createBrand, createType, fetchBrand, fetchDevice, fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateBrand =observer(({ show, onHide }) => {
  const {device}=useContext(Context)

  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrand().then(data=>device.setBrands(data))
    fetchDevice().then(data=>device.setDevice(data.rows))
  },[])
  const [value, setValue] = useState("");

  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={e => setValue(e.target.value)} placeholder={"ВВедите название бренда"} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>
            Закрыть
          </Button>
          <Button variant={"outline-success"} onClick={addBrand}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
});

export default CreateBrand;
