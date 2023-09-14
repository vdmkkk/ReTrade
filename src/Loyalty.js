import './App.css';
import arrow_black from './img/arrow_black.svg'
import telegram from './img/telegram.svg'
import instagram from './img/instagram.svg'
import logo_white from './img/logo_white.svg'
import phone from './img/phone.svg'
import logo from './img/logo.svg'
import phone_black from './img/phone_black.svg'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import FullScreenWindow from './FullScreen';
import { useState } from 'react';

function Loyalty() {
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };
    return(
        <div className='App'>
            <HeaderTopComponent/>
            <HeaderComponent openFullScreen={openFullScreen}/>
      <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />

            <div style={{"textAlign": "center", "backgroundColor": "#f6f6f6"}}>
                <h1 style={{"paddingTop": "200px", "fontSize": "40px"}}>😌</h1>
                <h1 style={{"fontSize": "35px", "fontWeight": "500", "marginBottom": "0px"}}>Раздел находится в разработке</h1>
                <h2 style={{"fontSize": "20px", "fontWeight": "400", "margin": "0px", "paddingBottom": "200px"}}>Совсем скоро мы запустим его.</h2>
            </div>

            <FooterComponent/>
        </div>
    )
}

export default Loyalty;