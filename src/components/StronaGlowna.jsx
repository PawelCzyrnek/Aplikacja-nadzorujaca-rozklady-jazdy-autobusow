import './../App.css';
import home from "./../image/BamBus.png";
import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import TopMenu from '../menu/Topmenu';
import NormalMenu from "../menu/Normalmenu";

const Home = () => {
  const { currentUser, logout } = useContext(AuthContext);
  if (currentUser?.rola_id === 'admin') {
    return (
      <div className="main">
        <center>
          <TopMenu />
          <div className='form'></div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="main">
        <center>
        <NormalMenu />
        <div className='form'></div>
        </center>
      </div>
    );
  }
};

export default Home;
