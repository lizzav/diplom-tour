import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
// import TravelsPage from "./components/TravelsPage";
import NavBar from "./components/NavBar/index";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
// import data from "bootstrap/js/src/dom/data";
import { Spinner } from "react-bootstrap";
import Header from "./components/Header";
import { fetchTravel } from "./http/travelsAPI";
import AddReview from "./components/modals/AddReview";
import AddError from "./components/modals/AddError";
// import NavBar from "./components/NavBar";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const { travel } = useContext(Context);
  useEffect(() => {
    fetchTravel().then(data => {
      travel.setTravels(data);
    });
  }, []);

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data);
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
      <Header />
      <div className={"main-grid"}>
        <NavBar />
        <main className="main">
          <div className={"page"}>
            <AppRouter />
            <p className={"main__error"} onClick={()=>setVisible(true)}>Не нашли что искали?/Нашли ошибку?</p>
          </div>
        </main>
      </div>

      <AddError
        show={visible}
        onHide={() => {
          setVisible(false);
        }}
      />
    </BrowserRouter>
  );
});

export default App;
