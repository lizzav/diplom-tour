import React, {useEffect, useState} from "react";
import "./Review.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import User from "../../assets/buttons/user.SVG";
import like from "../../assets/buttons/like.SVG";
import dislike from "../../assets/buttons/dislike.SVG";
import star from "../../assets/buttons/star.SVG";
import { Button } from "react-bootstrap";
import {fetchSight} from "../../http/sightAPI";
import OneReview from "./OneReview";
const Review = ({ratings}) => {
  const navigate = useNavigate();

  return (
    <div className={"review"}>
      {ratings?.length?
      ratings.map(el => (
        <OneReview rating={el}/>
        // <div className={"review__item"}>
        //   <div className={"review__header"}>
        //     <div className={"review__info"}>
        //       <img className={"img-icon user-icon"} src={User} />
        //       <div>
        //         <h6>{el.user.name??el.user.email}</h6>
        //         <p>{el.createdAt}</p>
        //       </div>
        //     </div>
        //     <p className={"review__grade"}>
        //       {el.grade}
        //       <img className={"img-icon"} src={star} />
        //     </p>
        //   </div>
        //   <p>{el.review}</p>
        //   <div className={"review__footer"}>
        //     <img className={"img-icon"} src={like} />
        //     {
        //       el.like.filter(el=>el.like===true).length
        //     }
        //     <img className={"img-icon"} src={dislike} />
        //     {
        //       el.like.filter(el=>el.like===false).length
        //     }
        //   </div>
        // </div>
      ))
        :<span>нет отзывов</span>
      }
      <Button className={"blue-button"}>Оставить отзыв</Button>
    </div>
  );
};

export default Review;
