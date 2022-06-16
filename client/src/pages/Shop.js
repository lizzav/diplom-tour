import React, {useContext, useEffect} from "react";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceItem from "../components/DeviceItem";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchTypes} from "../http/deviceAPI";
import data from "bootstrap/js/src/dom/data";
import Pages from "../components/Pages";

const Shop =observer(() => {
  const {device}=useContext(Context)

  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrand().then(data=>device.setBrands(data))
    fetchDevice(null, null,1,3).then(data=>{device.setDevice(data.rows);
    device.setTotalCount(data.count)
    })
  },[])

  useEffect(()=>{
    fetchDevice(device.selectedTypes.id, device.selectedBrand.id,device.page,device.limit).then(data=>{device.setDevice(data.rows);
      device.setTotalCount(data.count)
    })},[device.page,device.selectedBrand,device.selectedTypes])
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
