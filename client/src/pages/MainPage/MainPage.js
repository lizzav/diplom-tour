import React, {useContext, useEffect} from "react";
import "./MainPage.scss";
import { Carousel } from "react-bootstrap";
import AppRouter from "../../components/AppRouter";
import {fetchCountry, fetchOneCountry} from "../../http/countryesAPI";
import {Context} from "../../index";
import {fetchSight} from "../../http/sightAPI";
import {fetchCities} from "../../http/cityAPI";
import noPhoto from "../../assets/buttons/noPhoto.png";
import {observer} from "mobx-react-lite";
import {CITES_ROUTE, COUNTRIES_ROUTE, SIGHTS_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

const MainPage =  observer(() => {

  let navigate = useNavigate();
  // const sights = [
  //   {
  //     id: 1,
  //     name: "Египетские пирамиды",
  //     photo: 'https://geografishka.ru/wp-content/uploads/2019/12/gettyimages-1085205362-1920x1080.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: "Колизей",
  //     photo:
  //       "https://tour-poisk.com/uploads/posts/2018-10/1540240548_kolizey.jpg"
  //   },
  //   {
  //     id: 3,
  //     name: "Красная площадь",
  //     photo:
  //       "https://i04.fotocdn.net/s112/a74c7e3369db13a3/public_pin_l/2519481431.jpg"
  //   }
  // ];
  // const cites = [
  //   {
  //     id: 1,
  //     name: "Стамбул",
  //     photo:
  //       "https://traveltimes.ru/wp-content/uploads/2021/05/zagruzhennoe-5.jpg"
  //   },
  //   {
  //     id: 2,
  //     name: "Рим",
  //     photo:
  //       "https://traveltimes.ru/wp-content/uploads/2021/06/20170214154615_Rome-on-a-budget.jpg"
  //   },
  //   {
  //     id: 3,
  //     name: "Лондон",
  //     photo:
  //       "https://cdn.sozvezdie-tour.ru/images/uploadedfiles/c7577022-8d34-4887-9d84-88dbaa750ea6.jpg"
  //   },
  // ];
  // const countries = [
  //   {
  //     id: 1,
  //     name: "Франция",
  //     photo:
  //       "https://dsmr.ru/images/3bcdecae7f8a830b12739de858f1116e.jpg"
  //   },
  //   {
  //     id: 2,
  //     name: "Россия",
  //     photo:
  //       "https://4continents.com.ru/wp-content/uploads/2020/03/wsi-imageoptim-russia-scaled.jpg"
  //   },
  //   {
  //     id: 3,
  //     name: "Китай",
  //     photo:
  //       "https://alt-center.ru/scripts/jquery/kcfinder/upload/images/Kitay_4.jpg"
  //   },
  // ];


  const {country, city, sight}=useContext(Context)
  useEffect(()=>{
    fetchCountry().then(data=>{country.setCountry(data);})
    fetchSight().then(data=>{sight.setSights(data);})
    fetchCities().then(data=>{city.setCities(data);})
  },[])

  return (
    <>
      <div className={"carousel__page"}>
        <div className={"carousel__container"}>
          <h1>Лучшие достопримечательности</h1>
          {sight.sights.length?
          <Carousel fade>
            {sight.sights?.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  onClick={() => navigate(SIGHTS_ROUTE + "/" + el.id)}
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={
                    el.photo[0]?.name
                      ? process.env.REACT_APP_API_URL + el.photo[0]?.name
                      : noPhoto
                  }
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>:<span>ничего не найдено</span>}
        </div>
        <div className={"carousel__container"}>
          <h1>Лучшие города</h1>
          {city.cities.length ?
          <Carousel fade>
            {city.cities?.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  onClick={() => navigate(CITES_ROUTE + "/" + el.id)}
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={
                    el.photo[0]?.name
                      ? process.env.REACT_APP_API_URL + el.photo[0]?.name
                      : noPhoto
                  }
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>:<span>ничего не найдено</span>}
        </div>
        <div className={"carousel__container"}>
          <h1>Лучшие страны</h1>
          {country.countries.length ?
          <Carousel fade>
            {country.countries?.map(el => (
              <Carousel.Item key={el.id}>
                <img
                  onClick={() => navigate(COUNTRIES_ROUTE + "/" + el.id)}
                  className="d-block w-100 h-30"
                  style={{ height: "30vh", objectFit: "cover" }}
                  src={
                    el.photo[0]?.name
                      ? process.env.REACT_APP_API_URL + el.photo[0]?.name
                      : noPhoto
                  }
                />
                <Carousel.Caption>
                  <h3>{el.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>:<span>ничего не найдено</span>}
        </div>
      </div>
    </>
  );
});

export default MainPage;
