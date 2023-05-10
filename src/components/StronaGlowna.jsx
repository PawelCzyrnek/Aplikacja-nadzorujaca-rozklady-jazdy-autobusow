import { AuthContext } from '../context/authContext';
import './../App.css';
import home from "./../image/BamBus.png";
import React, { useContext } from "react";

const Home = () => {

  const { currentUser } = useContext(AuthContext);
  if( currentUser?.rola_id === 'admin'){
  return (
    <div className="main">
      <center>
      <div className='NazwaStrony'>
      <img className='imgh' src={home} alt="home"/>
      <div className='napis'>
      BamBus
      </div>
      <div className="nazwaU">
      {currentUser?.name}
      </div>
      </div>
        <div className='nawigacja'>
            <button>
            <p className="link">
            <a href='/rejestracja'>Rejestracja</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/login'>Login</a>
            </p>
            </button>
            {currentUser ? <button>Logout</button> : ''}
            <button>
            <p className="link">
            <a href='/DodawaniePracownikow'>Dodawanie Pracowników</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawaniePojazdow'>Dodawanie Pojazdów</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/UsuwaniePracownikow'>Usuwanie pracowników</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/DodawaniePrzystankow'>Dodawanie przystanków</a>
            </p>
            </button>
            <button>
            <p className="link">
            <a href='/EdytowaniePracownikow'>Edytowanie pracowników</a>
            </p>
            </button>
          </div>
        </center>
    </div>
  );
  }else{
    return (
      <div className="main">
        <center>
        <div className='NazwaStrony'>
        <img className='imgh' src={home} alt="home"/>
        <div className='napis'>
        BamBus
        </div>
        <div className="nazwaU">
        {currentUser?.name}
        </div>
        </div>
          <div className='nawigacja'>
              <button>
              <p className="link">
              <a href='/rejestracja'>Rejestracja</a>
              </p>
              </button>
              <button>
              <p className="link">
              <a href='/login'>Login</a>
              </p>
              </button>
            </div>
          </center>
      </div>
    );
  }
};

export default Home;