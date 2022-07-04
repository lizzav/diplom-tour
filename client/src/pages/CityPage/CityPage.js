import React, {useContext, useEffect, useState} from "react";
import "./CityPage.scss";
import { Button, Carousel, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import {useNavigate, useParams} from "react-router-dom";
import star from "../../assets/buttons/star.SVG";
import Review from "../../components/Review";
import {Context} from "../../index";
import {fetchOneSight, fetchSight} from "../../http/sightAPI";
import {fetchOneCountry} from "../../http/countryesAPI";
import {observer} from "mobx-react-lite";
import {CITES_ROUTE, SIGHTS_ROUTE, SITES_ROUTE} from "../../utils/const";
import Delete from "../../assets/buttons/delete.SVG";
import noPhoto from "../../assets/buttons/noPhoto.png";
import {fetchOneCity} from "../../http/cityAPI";
import Edit from "../../assets/buttons/edit.SVG";
const CityPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const  [city, setCity]=useState({})
  const  [rating, setRating]=useState(0)

  const { user } = useContext(Context);
  const {id}=useParams()
  useEffect(()=>{
    fetchOneCity(id).then(data=>{
      setCity(data);

      const rating = data.rating.reduce(
        (previousValue, el) => previousValue + el.grade,
        0
      );
      data.rating.length?setRating(rating/data.rating.length):setRating(0)

    })
  },[])
  let navigate = useNavigate();

  return (
    <>
      <div className={"travel__header"}>
        <h1>{city.name}</h1>
        <p className={"sight__rating"}>
          {rating??0}
          <img className={"img-icon"} src={star} />
        </p>
        {user.users.role==='ADMIN'&&<Button className={"blue-button"} onClick={() => setVisible(true)}>
          <img className={"img-icon"} src={Edit} />
          Создать новую страну
        </Button>}
      </div>
      <Carousel fade>
        {city.photo && city.photo.map(el => (
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
      <p>{city.description}</p>
      {city.lng&& city.lat&&<Maps direction={false} markers={[city]} />}
      <h2>Города</h2>
      <div className={"city__item"}>
      {city.sight?.map(el => (
        <>
          <img
            className={"travel__img travel__link"}
            src={el.photo[0]?.name?process.env.REACT_APP_API_URL+el.photo[0]?.name:noPhoto}
            onClick={() => navigate(SIGHTS_ROUTE + "/" + el.id)}
          />
          <h3
            className={"travel__link"}
            onClick={() => navigate(SIGHTS_ROUTE + "/" + el.id)}
          >
            {el.name}
          </h3>
          <p>{el.description}</p>
        </>
      ))}
    </div>

    </>
  );
});

export default CityPage;
