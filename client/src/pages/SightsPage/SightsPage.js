import React, { useState } from "react";
import "./SightsPage.scss";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateTravel from "../../components/modals/CreateTravel";
import { Button, Modal } from "react-bootstrap";
import Maps from "../../components/Maps";
import { useNavigate } from "react-router-dom";
import { SIGHTS_ROUTE, TRAVEL_ROUTE } from "../../utils/const";
const SightsPage = () => {
  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();
  const markers = [

    {
      id: 1,
      name: "Египетские пирамиды",
      photo: 'https://geografishka.ru/wp-content/uploads/2019/12/gettyimages-1085205362-1920x1080.jpg'
    },
    {
      id: 2,
      name: "Колизей",
      photo:
        "https://tour-poisk.com/uploads/posts/2018-10/1540240548_kolizey.jpg"
    },
    {
      id: 3,
      name: "Красная площадь",
      photo:
        "https://i04.fotocdn.net/s112/a74c7e3369db13a3/public_pin_l/2519481431.jpg"
    },
    {
      id: 4,
      name: "Мертвое море",
      photo:
        "https://avatars.mds.yandex.net/i?id=734c7c292a67ac0092b25ffc60397e21-5869035-images-thumbs&n=13&exp=1"
    },
    {
      id: 5,
      name: "Сахара",
      photo:
        "https://avatars.mds.yandex.net/i?id=5d09a683358f8c4268b50477000c88c1-5333993-images-thumbs&n=13&exp=1"
    },
    {
      id: 6,
      name: "Эйфелева башня",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGi2pD7ubpIJJUywr5Ziet9GB4UDOmK-FJut2Bsc2RtpZbtOEXnUyr8dG2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 7,
      name: "Голливуд",
      photo:
        "https://avatars.mds.yandex.net/i?id=edbb7e253c4c64ccd083911b5ea2ce33-4535989-images-thumbs&n=13&exp=1"
    },
    {
      id: 8,
      name: "Манхэттен",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FG3mkW7-e_IpRXngypYXCo92d6Xj2qeOcZvo2D5cjAt5JbtOMUnUCg_9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 9,
      name: "Лувр",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGi2kVuua_fM5Snlr2OSD5oGkrBj-oLbUZ6YeE48HGs5NbtOETmUah-9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 10,
      name: "Статуя свободы",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGh28SueLlcJUCyFv_OXH58jMuXzqpe7ND6drasc3F55BbtO8Vm0Ko-9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 11,
      name: "Тадж-Махал",
      photo:
        "https://img5.goodfon.ru/wallpaper/nbig/3/c1/indiia-tadzh-makhal-khram-dvorets-bashni-kupola-gazony-derev.jpg"
    },
    {
      id: 12,
      name: "Биг-Бен",
      photo:
        "https://ka-ap.ru/wp-content/uploads/4/4/a/44aee46bfbe6d6477acb7cdfbd30e31c.jpeg"
    },
    {
      id: 1,
      name: "Египетские пирамиды",
      photo: 'https://geografishka.ru/wp-content/uploads/2019/12/gettyimages-1085205362-1920x1080.jpg'
    },
    {
      id: 2,
      name: "Колизей",
      photo:
        "https://tour-poisk.com/uploads/posts/2018-10/1540240548_kolizey.jpg"
    },
    {
      id: 3,
      name: "Красная площадь",
      photo:
        "https://i04.fotocdn.net/s112/a74c7e3369db13a3/public_pin_l/2519481431.jpg"
    },
    {
      id: 4,
      name: "Мертвое море",
      photo:
        "https://avatars.mds.yandex.net/i?id=734c7c292a67ac0092b25ffc60397e21-5869035-images-thumbs&n=13&exp=1"
    },
    {
      id: 5,
      name: "Сахара",
      photo:
        "https://avatars.mds.yandex.net/i?id=5d09a683358f8c4268b50477000c88c1-5333993-images-thumbs&n=13&exp=1"
    },
    {
      id: 6,
      name: "Эйфелева башня",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGi2pD7ubpIJJUywr5Ziet9GB4UDOmK-FJut2Bsc2RtpZbtOEXnUyr8dG2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 7,
      name: "Голливуд",
      photo:
        "https://avatars.mds.yandex.net/i?id=edbb7e253c4c64ccd083911b5ea2ce33-4535989-images-thumbs&n=13&exp=1"
    },
    {
      id: 8,
      name: "Манхэттен",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FG3mkW7-e_IpRXngypYXCo92d6Xj2qeOcZvo2D5cjAt5JbtOMUnUCg_9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 9,
      name: "Лувр",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGi2kVuua_fM5Snlr2OSD5oGkrBj-oLbUZ6YeE48HGs5NbtOETmUah-9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 10,
      name: "Статуя свободы",
      photo:
        "https://yandex-images.clstorage.net/X4ltF9249/2cb64c-AzPA/_i9na0oBPeRKHVgfptg36xWJMJ3grPFw9FGh28SueLlcJUCyFv_OXH58jMuXzqpe7ND6drasc3F55BbtO8Vm0Ko-9G2Nkv9kCh2bXeAadinXivKc5a0x5uGXd4wUbG1pDTKUqNnjkEGx4sDBiBD0WfjFOjbmv2Lht3-Vu2jZfYb_Yq-mhdQ2I0cGG5yrEnwohkzxnDigpb84R3HE3LJoaUNlCedaoBYIvayECchaOp51zHt1a-ZjLXAwDz3vlrIOsqwu5QjesytPQxXcKZj67UcBetkwpi55MAZ_RtjwrGPKY0VmmK8QyL1jBwADWvdaeUg-8uhpqiXxccy7Lp26RDbpJe5NUndoQk4TF2XY8-7ABj-QsygveLSHe8XccuimAKyEIVit3Il9LQ-HRFlx0j1GeTWuJ6MofXTIM-0Z9ws3IK1uTV6-40dKWh7o3DZgAsp_WzEirLv5B7dHEP6qpAFnwSsSItKJ9-AEyUwTNh11DPb1ZOSu4b0xSbPsk7IGfyesLQjbOy7HjRDVJto0JUiAfJ05L-2_vIr0R5F0LGNIrkNmXGnSivLohg-IGP3Succ2tW1i6uF1_UmzYdQ-wLWoJmOI0TxvhQPbG6PVsucFRnoev6WreLaCfwbSu2DlQOAEaZru3UF36A2OhFg8U7oF-TXqbawp-T5APiEW-Aa8Li6rjhbw6U1K3BevmDejAwj3VDgtIPu1jH3KVfImrcisxuQXYN4A9OhGwoCWtdP6S_i-YeFkKnP0x75rlTmGNucha85bfulLD5RaZ1S0oU_BPdb1Ymt89I5-A5U4p-lD4M0iF2LcBLWihYtMkXye88C39yKmZKw6ckX06By9B_pvZOqOXzilxYcamelTc6xKTvLUvergOXWGfsvZO2fqjecN5V2uUUx_JMFKApC-1rwNvTNmLKet9PVNeSmYdk0-7ipqAFi7LYXPkt2vk_PsxUkzkbnmKvCwT_JE3c"
    },
    {
      id: 11,
      name: "Тадж-Махал",
      photo:
        "https://img5.goodfon.ru/wallpaper/nbig/3/c1/indiia-tadzh-makhal-khram-dvorets-bashni-kupola-gazony-derev.jpg"
    },
    {
      id: 12,
      name: "Биг-Бен",
      photo:
        "https://ka-ap.ru/wp-content/uploads/4/4/a/44aee46bfbe6d6477acb7cdfbd30e31c.jpeg"
    }
  ];
  return (
    <div className={"page"}>
      <div className={"travel__header"}>
        <h1>Достопримечательности</h1>
      </div>
      <div className={"sight"}>
      {markers.map(el => (
        <div className={"sight__item"}onClick={()=>navigate(SIGHTS_ROUTE+'/'+el.id)}>
          <img className={'sight__img'} src={el.photo} />
          <h3  className={'sight__link'}>{el.name}</h3>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SightsPage;
