import './../App.css';
import profile from "./../image/a.png";
import React from 'react';
function rejestracja() {
  return (
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>

         </div>
         <div>
           <h1>Rejestracja</h1>
           <div>
             <input type="text" placeholder="imię" className="name"/>
           </div>
           <div className="second-input">
             <input type="text" placeholder="nazwisko" className="name"/>
           </div>
           <div className="second-input">
             <input type="text" placeholder="nazwa użytkownika" className="name"/>
           </div>
           <div className="second-input">
             <input type="password" placeholder="hasło" className="name"/>
           </div>
          <div className="login-button">
          <button>Zarejestruj</button>
          </div>
            <p className="link">
            <a href='/'>Logowanie</a>
            </p>
           
         </div>
       </div>

     </div>
    </div>
  );
}

export default rejestracja;