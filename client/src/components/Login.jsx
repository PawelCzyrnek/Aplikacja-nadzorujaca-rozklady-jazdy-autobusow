import './../App.css';
import profile from "./../image/a.png";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';

  const LoginUser = () => {
    const [inputs, setInputs] = useState({
      login: "",
      password: "",
    });
    const [err, setError] = useState(null);
  
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(inputs)
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      } 
    };

  return (
    <div className="main">
    <center>
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>
           </div>
         </div>
         <div>
           <h1>Logowanie</h1>
           <form>
           <div>
             <input required type="text" placeholder="login użytkownika" name="login" onChange={handleChange} />
           </div>
           <div className="second-input">
             <input required type="password" placeholder="hasło" name="password" onChange={handleChange} />
           </div>
          <div className="login-button">
          <button onClick={handleSubmit} >Zaloguj</button>
          </div>
          </form>
            <button><p className="link">
            <Link to="/rejestracja">Rejestracja</Link>
            </p></button>
         </div>
         {err && <p>{err}</p>}
       </div>
     </div>
     </center>
    </div>
  );
}

export default LoginUser;