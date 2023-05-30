import axios from "axios";
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Profil = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!currentUser) {
    navigate("/");
    return null;
  }

  if (currentUser?.rola_id === 'admin') {
    return (
      <div className="main">
        <center>
          <TopMenu />
          <div className="form">
            <h1>Profil</h1>
            <h2>{currentUser?.name} {currentUser?.surename}</h2>
            <h2>Rola: {currentUser?.rola_id}</h2>
            <button><Link to="/">Strona główna</Link></button>
            <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
            <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="main">
        <center>
          <NormalMenu />
          <div className="form">
            <h1>Profil</h1>
            <h2>{currentUser?.name} {currentUser?.surename}</h2>
            <h2>Rola: {currentUser?.rola_id}</h2>
            <button><Link to="/">Strona główna</Link></button>
            <button><Link to="/EdytowanieProfilu">Edytuj profil</Link></button>
            <button><Link to="/ZmianaHasla">Zmień hasło</Link></button>
          </div>
        </center>
      </div>
    );
  }
};

export default Profil;
