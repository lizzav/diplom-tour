import React, {useContext, useEffect, useState} from "react";
import "./Review.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import User from "../../assets/buttons/user.SVG";
import like from "../../assets/buttons/like.SVG";
import dislike from "../../assets/buttons/dislike.SVG";
import star from "../../assets/buttons/star.SVG";
import { Button } from "react-bootstrap";
import {fetchSight} from "../../http/sightAPI";
import OneReview from "./OneReview";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import AddSightInTravel from "../modals/AddSightInTravel";
import AddReview from "../modals/AddReview";
const Review = observer(({ratings,onUpdate}) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(Context);
  return (
    <>
    <div className={"review"}>
      {ratings?.length?
      ratings.map(el => (
        <OneReview rating={el}/>
      ))
        :<span>нет отзывов</span>
      }
      {user.isAuth &&  <Button onClick={() => setVisible(true)} className={"blue-button"}>Оставить отзыв</Button>}
    </div>
    <AddReview
  show={visible}
  onHide={() => {
    setVisible(false);
    onUpdate()
  }}
  />
  </>
  );
});

export default Review;
