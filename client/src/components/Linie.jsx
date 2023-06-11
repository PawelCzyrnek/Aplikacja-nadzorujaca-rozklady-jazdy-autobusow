import React, { useContext , useEffect } from "react";
import { AuthContext } from '../context/authContext';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Linie = () => {
  const [linia, setVehicles] = useState([]);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:8800/linie");
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVehicles();
  }, []);

  console.log(linia);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/linie/"+id);
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <TopMenu />
          <div className="formusun">
          <h1>Linie</h1>
        {linia.map((linia) => (
          <div key={linia.id} className="vehicle">
            <h2>nazwa: {linia.nazwa}</h2>
            <h2>nr: {linia.nr}</h2>
            <Link to={`/TrasyLinii/${linia.id}`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
                Informacje o linii
            </button></Link>
            <Link to={`/WyswietlanieTras/${linia.id}`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
                Dodaj trase
            </button></Link>
          </div>
        ))}
        </div>
      </center>
    </div>
  );  
}else{
  return (
    <div className="main">
      <center>
      <NormalMenu />
        </center>
    </div>
  );
}
};

export default Linie;