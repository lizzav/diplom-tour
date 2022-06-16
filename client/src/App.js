import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
// import TravelsPage from "./components/TravelsPage";
// import NavBar from "./components/NavBar/index";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
// import data from "bootstrap/js/src/dom/data";
import { Spinner } from "react-bootstrap";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check()
      .then(data => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Spinner animation={"grow"} />;
  }
  return (
    <BrowserRouter>
      {/*<NavBar/>*/}
      {/*<Header/>*/}
      {/*<div className={'main-grid'}>*/}
      <NavBar/>
        {/*<main className="main">*/}
          <AppRouter/>
        {/*</main>*/}
    {/*</div>*/}
    </BrowserRouter>
  );
});

export default App;
