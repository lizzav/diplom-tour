import React, {useContext, useEffect, useState} from "react";
import "./Review.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import User from "../../assets/buttons/user.SVG";
import like from "../../assets/buttons/like.SVG";
import dislike from "../../assets/buttons/dislike.SVG";
import star from "../../assets/buttons/star.SVG";
import { Button } from "react-bootstrap";
import {fetchSight} from "../../http/sightAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const OneReview = observer(({rating}) => {
  const navigate = useNavigate();

  const {user}=useContext(Context)
  const [likes, setLikes] = useState(false);

  const [dislikes, setDislikes] = useState(false);
  const [review, setReview] = useState(false);

  const setReviews=()=>{
    if(review){
      return
    }
    if(rating.like.find(el=>el.userId===user.users.id)){
//редактируем или удаляем
      console.log(user.users.id)
    }
    //создаем
    //обновляем данные для отзыва
  }

  useEffect(()=>{
    setLikes(rating.like.filter(el=>el.like===true).length)
    setDislikes(rating.like.filter(el=>el.like===false).length)
  },[rating])
  return (
        <div className={"review__item"}>
          <div className={"review__header"}>
            <div className={"review__info"}>
              <img className={"img-icon user-icon"} src={User} />
              <div>
                <h6>{rating.user.name??rating.user.email}</h6>
                <p>{rating.createdAt}</p>
              </div>
            </div>
            <p className={"review__grade"}>
              {rating.grade}
              <img className={"img-icon"} src={star} />
            </p>
          </div>
          <p>{rating.review}</p>
          <div className={"review__footer"}>
            <div onClick={()=>setReviews()}>
              <img className={"img-icon"} src={like} />
              {
                likes
              }</div>
            <div>
              <img className={"img-icon"} src={dislike} />
              {
                dislikes
              }</div>
          </div>
        </div>)
});

export default OneReview;
