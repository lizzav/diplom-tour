import React, {useContext, useEffect, useState} from "react";
import "./CountryPage.scss";
import { Button, Carousel, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import {useNavigate, useParams} from "react-router-dom";
import star from "../../assets/buttons/star.SVG";
import Review from "../../components/Review";
import {Context} from "../../index";
import {fetchOneSight, fetchSight} from "../../http/sightAPI";
import {fetchOneCountry} from "../../http/countryesAPI";
import {observer} from "mobx-react-lite";
const CountryPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const  [sight, setSight]=useState({})
  const  [rating, setRating]=useState(0)

  const {id}=useParams()
  useEffect(()=>{
    fetchOneCountry(id).then(data=>{
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
      {sight.lng&& sight.lat&&<Maps direction={false} markers={[sight]} />}
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
});

export default CountryPage;
