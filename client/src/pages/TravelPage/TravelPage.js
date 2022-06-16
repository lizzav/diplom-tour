import React, { useState } from "react";
import "./TravelPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import { useNavigate } from "react-router-dom";
import { SIGHTS_ROUTE, TRAVEL_ROUTE } from "../../utils/const";
import Delete from "../../assets/buttons/delete.SVG";
import AppRouter from "../../components/AppRouter";
const TravelPage = () => {
  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();
  const markers = [
    {
      id: 7,
      name: "Голливуд",
      photo:
        "https://avatars.mds.yandex.net/i?id=edbb7e253c4c64ccd083911b5ea2ce33-4535989-images-thumbs&n=13&exp=1",
      lat:  34.0934132,
      lng: -118.3258773,
      address: "Голливуд, Лос-Анджелес, Лос Анджелес Каунти, Калифорния, Соединенные Штаты Америки"
    },
    {
      id: 8,
      name: "Манхэттен",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FG3mkW7-e_IpRXngypYXCo92d6Xj2qeOcZvo2D5cjAt5JbtOMUnUCg_9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c",

      lat: 40.7484831,
      lng: -73.9856715,
      address: "United States of America, New York, 5th Avenue, 350"
    },
    {
      id: 10,
      name: "Статуя свободы",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGh28SueLlcJUCyFv_OXH58jMuXzqpe7ND6drasc3F55BbtO8Vm0Ko-9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c",
      lat:40.6892494,
      lng: -74.0445004,
      address: "New York, NY 10004, Соединенные Штаты"
    }
  ];
  return (
    <div className={"page"}>
      <div className={"travel__header"}>
        <h1>Мой отпуск</h1>
      </div>
      <div className={"travel__item"}>
        {markers.map(el => (
          <>
            <input type={"checkbox"} />
            <img
              className={"travel__img travel__link"}
              src={el.photo}
              onClick={() => navigate(SIGHTS_ROUTE + "/" + el.id)}
            />
            <h3
              className={"travel__link"}
              onClick={() => navigate(SIGHTS_ROUTE + "/" + el.id)}
            >
              {el.name}
            </h3>
            <p>{el.address}</p>
            <div>
              <img className={"img-icon"} src={Delete} />
            </div>
          </>
        ))}
      </div>

      <Maps markers={markers} direction={true} />
      <p className={"main__error"}>Не нашли что искали?/Нашли ошибку?</p>
    </div>
  );
};

export default TravelPage;
