import React, {useContext, useEffect, useState} from "react";
import "./Review.scss";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import User from "../../assets/buttons/user.SVG";
import like from "../../assets/buttons/like.SVG";
import dislike from "../../assets/buttons/dislike.SVG";
import star from "../../assets/buttons/star.SVG";
import { Button } from "react-bootstrap";
import {addLike, addReview, deleteLike, fetchSight, getOneReview, updateLike} from "../../http/sightAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const OneReview = observer(({rating}) => {
  const navigate = useNavigate();
  const {user}=useContext(Context)
  const [likes, setLikes] = useState(false);

  const [dislikes, setDislikes] = useState(false);
  const [review, setReview] = useState(false);
  const [oneRating, setOneRating] = useState(rating);

  const { id } = useParams();
  const updateRating=()=>{
    getOneReview(id)
      .then(data => setOneRating(data.find((el)=>el.id===rating.id)))
      .catch(e => {
        alert("возникла ошибка: " + e);
      });
  }
  const setReviews=(likes)=>{
    if(review){
      return
    }
    const ratings=oneRating.like.find(el=>el.userId===user.users.id)
    if(!ratings){
      addLike(oneRating.id, {
        like:likes
      })
        .then(data => updateRating())
        .catch(e => {
          alert("возникла ошибка: " + e);
        });
      return;
    }
   const { like, userId, ratingId }=ratings;
    if(likes===like){
      deleteLike(ratings.id)
        .then(data => updateRating())
        .catch(e => {
          alert("возникла ошибка: " + e);
        });
return;
    }
    updateLike(ratings.id, {
      like:likes,
      userId,
      ratingId
    })
      .then(data => updateRating())
      .catch(e => {
        alert("возникла ошибка: " + e);
      });
    //создаем
    //обновляем данные для отзыва
  }

  useEffect(()=>{
    setLikes(oneRating.like.filter(el=>el.like===true).length)
    setDislikes(oneRating.like.filter(el=>el.like===false).length)
  },[oneRating])
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
            <div onClick={()=>setReviews(true)}>
              <img className={"img-icon"} src={like} />
              {
                likes
              }</div>
            <div onClick={()=>setReviews(false)}>
              <img className={"img-icon"} src={dislike} />
              {
                dislikes
              }</div>
          </div>
        </div>)
});

export default OneReview;
