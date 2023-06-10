import axios from "axios";
import React, { useContext , useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const ProfilBilety = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;
  const navigate = useNavigate();
  
  const [bilety, setBilety] = useState([]);
    useEffect(() => {
      const fetchAllBilety = async () => {
        try {
          const res = await axios.get("http://localhost:8800/bilety/"+userId);
          setBilety(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBilety();
    }, []);

    const [biletm, setBiletm] = useState([]);
    useEffect(() => {
      const fetchAllBiletm = async () => {
        try {
          const res = await axios.get("http://localhost:8800/biletm/"+userId);
          setBiletm(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBiletm();
    }, []);
    console.log(bilety);
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
            <h1>Twoje zakupione bilety</h1>
            {Array.isArray(bilety) && bilety.map((bilet) => (
          <div key={bilet.id} className="bilety">
            <h2>Bilet na trase nr {bilet.bilet_o_id}</h2>
          </div>
        ))}
        {Array.isArray(biletm) && biletm.map((biletm) => (
          <div key={biletm.id} className="bilety">
            <h2>Bilet miesięczny na trase nr {biletm.bilet_m_id}</h2>
          </div>
        ))}
            <button><Link to="/Profil">Profil</Link></button>
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
            <h1>Twoje zakupione bilety</h1>
            {bilety.map((bilet) => (
          <div key={bilet.id} className="bilety">
            <h2>Bilet na trase nr {bilet.bilet_o_id}</h2>
          </div>
        ))}
        {biletm.map((biletm) => (
          <div key={biletm.id} className="bilety">
            <h2>Bilet miesięczny na trase nr {biletm.bilet_m_id}</h2>
          </div>
        ))}
            <button><Link to="/Profil">Profil</Link></button>
          </div>
        </center>
      </div>
    );
  }
};

export default ProfilBilety;
