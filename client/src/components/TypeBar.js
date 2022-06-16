import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map(el => (
        <ListGroupItem
          style={{ cursor: "pointer" }}
          active={el.id === device.selectedTypes.id}
          onClick={() => {
            device.setSelectedTypes(el);
          }}
          key={el.id}
        >
          {el.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
