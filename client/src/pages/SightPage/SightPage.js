import React, {useContext, useEffect, useState} from "react";
import "./SightPage.scss";
import { Button, Carousel, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import {useNavigate, useParams} from "react-router-dom";
import star from "../../assets/buttons/star.SVG";
import Review from "../../components/Review";
import {Context} from "../../index";
import {fetchOneSight, fetchSight} from "../../http/sightAPI";
import {observer} from "mobx-react-lite";
const SightPage =observer( () => {
  const [visible, setVisible] = useState(false);

  const  [sight, setSight]=useState({})
  const  [rating, setRating]=useState(0)

  const {id}=useParams()
  useEffect(()=>{
    fetchOneSight(id).then(data=>{
      setSight(data);
      console.log(data.rating)

      const rating = data.rating.reduce(
        (previousValue, el) => previousValue + el.grade,
        0
      );
      data.rating.length?setRating(rating/data.rating.length):setRating(0)

    })
  },[])
  let navigate = useNavigate();

  return (
    <div className={"page"}>
      <div className={"travel__header"}>
        <h1>{sight.name}</h1>
        <p className={"sight__rating"}>
          {rating??0}
          <img className={"img-icon"} src={star} />
        </p>
      </div>
      <Carousel fade>
        {sight.photo &&sight.photo.map(el => (
          <Carousel.Item key={el.id}>
            <img
              className="d-block w-100 h-30"
              style={{ height: "30vh", objectFit: "cover" }}
              src={process.env.REACT_APP_API_URL+el.name}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h2>Описание</h2>
      <p>{sight.description}</p>
      <h2>Адрес</h2>
      <p>{sight.address}</p>
      {sight.lng&& sight.lat&&<Maps direction={false} markers={[sight]} />}
      <h2>Отзывы</h2>

      <Review ratings={sight.rating?sight.rating:[]}/>
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
});

export default SightPage;
