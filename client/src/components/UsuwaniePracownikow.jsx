import React, { useContext } from "react";
import { AuthContext } from '../context/authContext';
import home from "./../image/BamBus.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopMenu from "../menu/Topmenu";
import NormalMenu from "../menu/Normalmenu";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  console.log(users);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/users/"+id);
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
          <h1>Użytkownicy</h1>
        {users.map((user) => (
          <div key={user.id} className="user">
            <h2>Imię: {user.name}</h2>
            <h2>Nazwisko: {user.surename}</h2>
            <h2>Rola: {user.rola_id}</h2>
            <button className="delete" onClick={() => handleDelete(user.id)}>Usuń</button>
            <button className="update">
            <Link
                to={`/EdytowaniePracownikow/${user.id}`}
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

export default Users;