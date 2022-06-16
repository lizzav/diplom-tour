import React, { useState } from "react";
import "./SightPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Carousel, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import { useNavigate } from "react-router-dom";
import { SIGHTS_ROUTE, TRAVEL_ROUTE } from "../../utils/const";
import star from "../../assets/buttons/star.SVG";
import User from "../../assets/buttons/user.SVG";
import AppRouter from "../../components/AppRouter";
import Review from "../../components/Review";
const SightPage = () => {
  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();
  const marker = {
    id: 1,
    lat:  48.8583701,
    lng:2.29444,
    name: "Эйфелева башня",
    description:
      "Задуманная изначально как временная постройка, Эйфелева башня стала символом Франции и объектом восхищения. Однако история создания и строительства впечатляющего сооружения была драматичной. У многих парижан башня вызывала только негативные эмоции, — горожане полагали, что такая высокая конструкция не впишется в облик их любимой столицы или вообще разрушится. Но со временем французы оценили Эйфелеву башню и полюбили её. Сегодня тысячи людей фотографируются на фоне знаменитой достопримечательности, к ней стремятся все влюблённые, чтобы провести незабываемые мгновения. Каждая девушка, которой назначили свидание на Эйфелевой башне, надеется, что именно там, взяв в свидетели весь Париж, любимый сделает ей предложение руки и сердца.",
    address: "Франция, Иль-де-Франс, Париж, авеню Пьер Лоти, 12",
    rating: 4.83
  };
  const photos = [
    {
      id: 1,
      name:
        "https://avatars.mds.yandex.net/i?id=e7dd047c5b7da5efdd1bf22c8e6fcd81-5887964-images-thumbs&n=13&exp=1"
    },
    {
      id: 2,
      name:
        "https://avatars.mds.yandex.net/i?id=032b6b72909e7212acb0fca581290d68-5235953-images-thumbs&n=13&exp=1"
    },
    {
      id: 3,
      name:
      "https://avatars.mds.yandex.net/i?id=fa5166b9f892b4be6a517032e4434ea3-5467799-images-thumbs&n=13&exp=1"
    },
    {
      id: 4,
      name:
        "https://avatars.mds.yandex.net/i?id=0518e48cba20842707e4e8c9f927d34a-5669136-images-thumbs&n=13&exp=1"
    },
  ];

  return (
    <div className={"page"}>
      <div className={"travel__header"}>
        <h1>{marker.name}</h1>
        <p className={"sight__rating"}>
          {" "}
          {marker.rating}
          <img className={"img-icon"} src={star} />
        </p>
      </div>
      <Carousel fade>
        {photos.map(el => (
          <Carousel.Item key={el.id}>
            <img
              className="d-block w-100 h-30"
              style={{ height: "30vh", objectFit: "cover" }}
              src={el.name}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h2>Описание</h2>
      <p>{marker.description}</p>
      <h2>Адрес</h2>
      <p>{marker.address}</p>
      <Maps direction={false} markers={[marker]} />
      <h2>Отзывы</h2>
      <Review />
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
};

export default SightPage;
