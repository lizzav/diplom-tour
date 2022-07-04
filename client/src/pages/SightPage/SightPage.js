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
import Add from "../../assets/buttons/add.SVG";
import CreateTravel from "../../components/modals/CreateTravel";
import AddSightInTravel from "../../components/modals/AddSightInTravel";
const SightPage =observer( () => {
  const [visible, setVisible] = useState(false);

  const  [sight, setSight]=useState({})
  const  [rating, setRating]=useState(0)

  const { user } = useContext(Context);
  const {id}=useParams()
  useEffect(()=>{update()
  },[])
  const update=()=>{
    fetchOneSight(id).then(data=>{
      setSight(data);

      const rating = data.rating.reduce(
        (previousValue, el) => previousValue + el.grade,
        0
      );
      data.rating.length?setRating(rating/data.rating.length):setRating(0)

    })

  }
  let navigate = useNavigate();

  return (
    <>
      <div className={"travel__header"}>

        <h1>{sight.name}</h1>
        <p className={"sight__rating"}>
          <span>
          {rating??0}
          <img className={"img-icon"} src={star} />
        </span>
          {user.isAuth &&<Button className={"blue-button"} onClick={() => setVisible(true)}>
            <img className={'img-icon'} src={Add}/>Добавить в поездку
            </Button>
          }
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

      <Review
        onUpdate={update} ratings={sight.rating?sight.rating:[]}/>
    <AddSightInTravel
  show={visible}
  onHide={() => {
    setVisible(false);
  }}
  />
  </>
  );

});

export default SightPage;
