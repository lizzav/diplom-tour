import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroupItem, Row } from "react-bootstrap";
import { Card } from "reactstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.brands.map(el => (
        <Card
          key={el.id}
          className={"p-3"}
          style={{ cursor: "pointer" }}
          border={el.id === device.selectedBrand.id ? "danger" : "light"}
          onClick={() => {
            device.setSelectedBrand(el);
          }}
        >
          {el.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
