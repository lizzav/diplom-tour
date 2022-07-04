import React, { useContext, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import DeviceItem from "../DeviceItem";
import { createDevice } from "../../http/deviceAPI";
import data from "bootstrap/js/src/dom/data";

const CreateDevice = ({ show, onHide }) => {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);
  const { device } = useContext(Context);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = number => {
    setInfo(info.filter(el => el.number !== number));
  };
  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
  };
  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedTypes.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then(data=>onHide());
  };
  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={"mt-3"}>
            <Dropdown.Toggle>Выберете тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type => (
                <Dropdown.Item
                  onClick={() => device.setSelectedTypes(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className={"mt-3"}>
            <Dropdown.Toggle>Выберете бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className={"mt-3"}
            placeholder={"ВВедите название устройства"}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            className={"mt-3"}
            placeholder={"ВВедите стоимость"}
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
          <Form.Control className={"mt-3"} type="file" onChange={selectFile} />
          <hr />
          <Button variant={"outline-light"} onClick={addInfo}>
            Добавить новое свойстро
          </Button>
          {info.map(i => (
            <Row className={"mt-3"} key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder={"Введите название своства"}
                  value={i.title}
                  onChange={e => changeInfo("title", e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder={"Введите отисание своства"}
                  value={i.description}
                  onChange={e =>
                    changeInfo("description", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={"outline-success"} onClick={addDevice}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
