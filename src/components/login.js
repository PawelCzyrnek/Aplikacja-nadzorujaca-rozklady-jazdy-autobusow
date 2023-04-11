import './../App.css';
import profile from "./../image/a.png";
import React from 'react';
function LoginUi() {
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
           <h1>Logowanie</h1>
           <div>
             <input type="text" placeholder="nazwa użytkownika" className="name"/>
           </div>
           <div className="second-input">
             <input type="password" placeholder="hasło" className="name"/>
           </div>
          <div className="login-button">
          <button>Zaloguj</button>
          </div>
            <p className="link">
            <a href='/rejestracja'>Rejestracja</a>
            </p>
           
         </div>
       </div>

     </div>
    </div>
  );
}

export default LoginUi;