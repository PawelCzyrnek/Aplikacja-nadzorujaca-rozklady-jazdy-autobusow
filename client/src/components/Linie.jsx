import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Linie = () => {
  const [linie, setLinie] = useState([]);

  useEffect(() => {
    const fetchAllLinie = async () => {
      try {
        const res = await axios.get("http://localhost:8800/linie");
        setLinie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLinie();
  }, []);

  console.log(linie);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/linie/"+id);
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  };

  const { currentUser,logout } = useContext(AuthContext);
  if (currentUser?.rola_id === 1) {
  return (
    <div className="main">
      <center>
      <TopMenu />
      <div className="formusun">
  {linie.map((przystanek, index) => (
    <div key={index} className="stop">
      <h2>nazwa : {przystanek.nazwa}</h2>
      <h2>nr: {przystanek.nr}</h2>
      <button className="delete" onClick={() => handleDelete(przystanek.id)}>Usuń</button>
      <button className="update">
        <Link
          to={`/TrasyLinii/${przystanek.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Info o linii
        </Link>
      </button>
      <Link to={`/EdytowanieLinii/${przystanek.id}`}
                style={{ color: "inherit", textDecoration: "none" }}>
            <button>
            <p className="link">
              Edytuj
            </p>
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