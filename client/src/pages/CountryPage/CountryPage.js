import React, { useContext, useEffect, useState } from "react";
import "./CountryPage.scss";
import { Button, Carousel, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import { useNavigate, useParams } from "react-router-dom";
import star from "../../assets/buttons/star.SVG";
import Review from "../../components/Review";
import { Context } from "../../index";
import { fetchOneSight, fetchSight } from "../../http/sightAPI";
import { fetchOneCountry } from "../../http/countryesAPI";
import { observer } from "mobx-react-lite";
import { CITES_ROUTE, SIGHTS_ROUTE, SITES_ROUTE } from "../../utils/const";
import Delete from "../../assets/buttons/delete.SVG";
import noPhoto from "../../assets/buttons/noPhoto.png";
import Edit from "../../assets/buttons/edit.SVG";
import CreateCountry from "../../components/modals/CreateCountry";
const CountryPage = observer(() => {
  const [visible, setVisible] = useState(false);

  const [sight, setSight] = useState({});
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  useEffect(() => {
    fetchOneCountry(id).then(data => {
      setSight(data);

      const rating = data.rating.reduce(
        (previousValue, el) => previousValue + el.grade,
        0
      );
      data.rating.length
        ? setRating(rating / data.rating.length)
        : setRating(0);
    });
  }, [visible]);
  let navigate = useNavigate();

  const {user}=useContext(Context)
  return (
    <>
      <div className={"travel__header"}>
        <h1>{sight.name}</h1>
        <p className={"sight__rating"}>
          {rating ?? 0}
          <img className={"img-icon"} src={star} />
          {user.users.role==='ADMIN'&&<Button className={"blue-button"} onClick={() => setVisible(true)}>
            <img className={"img-icon"} src={Edit} />
            Изменить страну
          </Button>}
        </p>
      </div>
      <Carousel fade>
        {sight.photo &&
          sight.photo.map(el => (
            <Carousel.Item key={el.id}>
              <img
                className="d-block w-100 h-30"
                style={{ height: "30vh", objectFit: "cover" }}
                src={process.env.REACT_APP_API_URL + el.name}
              />
            </Carousel.Item>
          ))}
      </Carousel>
      <h2>Описание</h2>
      <p>{sight.description}</p>
      {sight.lng && sight.lat && <Maps direction={false} markers={[sight]} />}
      <h2>Города</h2>
      <div className={"city__item"}>
        {sight.city?.map(el => (
          <>
            <img
              className={"travel__img travel__link"}
              src={
                el.photo[0]?.name
                  ? process.env.REACT_APP_API_URL + el.photo[0]?.name
                  : noPhoto
              }
              onClick={() => navigate(CITES_ROUTE + "/" + el.id)}
            />
            <h3
              className={"travel__link"}
              onClick={() => navigate(CITES_ROUTE + "/" + el.id)}
            >
              {el.name}
            </h3>
            <p>{el.description}</p>
          </>
        ))}
      </div>

      <CreateCountry
        show={visible}
        onHide={() => {
          setVisible(false);
        }}
        editCountry={sight}
      />
    </>
  );
});

export default CountryPage;
