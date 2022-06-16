import React from "react";
import "./MainPage.scss";
import { Carousel } from "react-bootstrap";
import AppRouter from "../../components/AppRouter";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

const MainPage = () => {
  const sights = [
    {
      id: 1,
      name: "Египетские пирамиды",
      photo: 'https://geografishka.ru/wp-content/uploads/2019/12/gettyimages-1085205362-1920x1080.jpg'
    },
    {
      id: 2,
      name: "Колизей",
      photo:
        "https://tour-poisk.com/uploads/posts/2018-10/1540240548_kolizey.jpg"
    },
    {
      id: 3,
      name: "Красная площадь",
      photo:
        "https://i04.fotocdn.net/s112/a74c7e3369db13a3/public_pin_l/2519481431.jpg"
    }
  ];
  const cites = [
    {
      id: 1,
      name: "Стамбул",
      photo:
        "https://traveltimes.ru/wp-content/uploads/2021/05/zagruzhennoe-5.jpg"
    },
    {
      id: 2,
      name: "Рим",
      photo:
        "https://traveltimes.ru/wp-content/uploads/2021/06/20170214154615_Rome-on-a-budget.jpg"
    },
    {
      id: 3,
      name: "Лондон",
      photo:
        "https://cdn.sozvezdie-tour.ru/images/uploadedfiles/c7577022-8d34-4887-9d84-88dbaa750ea6.jpg"
    },
  ];
  const countries = [
    {
      id: 1,
      name: "Франция",
      photo:
        "https://dsmr.ru/images/3bcdecae7f8a830b12739de858f1116e.jpg"
    },
    {
      id: 2,
      name: "Россия",
      photo:
        "https://4continents.com.ru/wp-content/uploads/2020/03/wsi-imageoptim-russia-scaled.jpg"
    },
    {
      id: 3,
      name: "Китай",
      photo:
        "https://alt-center.ru/scripts/jquery/kcfinder/upload/images/Kitay_4.jpg"
    },
  ];
  return (
    <div className={"page"}>
      <div className={"carousel__page"}>
        <div className={"carousel__container"}>
          <h1>Лучшие достопримечательности</h1>
          <Carousel fade>
            {sights.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={el.photo}
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className={"carousel__container"}>
          <h1>Лучшие Города</h1>
          <Carousel fade>
            {cites.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={el.photo}
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className={"carousel__container"}>
          <h1>Лучшие страны</h1>
          <Carousel fade>
            {countries.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={el.photo}
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
};

export default MainPage;
