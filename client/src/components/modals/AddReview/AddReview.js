import React, { useContext, useState } from "react";
import "./AddReview.scss";
import { NavLink, useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../../http/deviceAPI";
import { createTravel, fetchTravel, putSight } from "../../../http/travelsAPI";
import { Context } from "../../../index";
import { addReview } from "../../../http/sightAPI";
const AddReview = ({ show, onHide }) => {
  const { travel } = useContext(Context);
  const [value, setValue] = useState("");
  const [grade, setGrade] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  // setValue(travel.travels[0].id)
  const createReview = () => {
    if (!grade) {
      setError("Не заполнена оценка");
    }

    addReview({
      review: value,
      grade: grade,
      sightId: id
    })
      .then(data => {
        setValue("");
        setGrade(0);
        setError("");
        onHide();
      })
      .catch(e => {
        alert("возникла ошибка: " + e);
        onHide();
      });
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title id={"contained-modal-title-vcenter"}>
          Создание отзыва
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="rating-area">
            <input type="radio" id="star-5" name="rating" value="5" />
            <label
              htmlFor="star-5"
              title="Оценка «5»"
              onClick={() => setGrade(5)}
            ></label>
            <input type="radio" id="star-4" name="rating" value="4" />
            <label
              htmlFor="star-4"
              title="Оценка «4»"
              onClick={() => setGrade(4)}
            ></label>
            <input type="radio" id="star-3" name="rating" value="3" />
            <label
              htmlFor="star-3"
              title="Оценка «3»"
              onClick={() => setGrade(3)}
            ></label>
            <input type="radio" id="star-2" name="rating" value="2" />
            <label
              htmlFor="star-2"
              title="Оценка «2»"
              onClick={() => setGrade(2)}
            ></label>
            <input type="radio" id="star-1" name="rating" value="1" />
            <label
              htmlFor="star-1"
              title="Оценка «1»"
              onClick={() => setGrade(1)}
            ></label>
          </div>
          <Form.Control
            required
            placeholder={"Введите отзыв"}
            value={value}
            onChange={e => setValue(e.target.value)}
            as="textarea"
          />
        </Form>
        {grade ? <span>{error}</span> : <span></span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button className={"blue-button"} onClick={createReview}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReview;
