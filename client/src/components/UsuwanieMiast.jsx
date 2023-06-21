import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Miasto = () => {
  const [miasto, setmiasto] = useState([]);

  useEffect(() => {
    const fetchAllMiasto = async () => {
      try {
        const res = await axios.get("http://localhost:8800/miasto");
        setmiasto(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMiasto();
  }, []);

  console.log(miasto);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/miasto/"+id);
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
  {miasto.map((przystanek, index) => (
    <div key={index} className="stop">
      <h2>Nazwa_miasta: {przystanek.nazwa_miasta}</h2>
     
      <button className="delete" onClick={() => handleDelete(przystanek.id)}>Usuń</button>
      <button className="update">
        <Link
          to={`/EdytowanieMiasta/${przystanek.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Edytuj
        </Link>
      </button>
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

export default Miasto;