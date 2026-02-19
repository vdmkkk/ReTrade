import React from 'react';
import './App.css';
import './App2.css';
import close from './img/close.svg'
import phone_black from './img/phone_black.svg'
import telegram from './img/telegram_black.svg'
import instagram from './img/instagram_black.svg'
import whatsapp from './img/whatsapp_black.svg'

const FullScreenWindow = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="full-screen-overlay">
      <div className="full-screen-content">
        <img style={{"position": "absolute", "top": "20px", "right": "20px"}} src={close} onClick={onClose}/>
        <ul className='header-list'>
        <a href='/#/shop'><li className='header-item'>Каталог</li></a>
        <a href='/#/warranty'><li className='header-item'>Гарантия</li></a>
        <a style={{"width": "max-content"}} href='/#/delivery'><li className='header-item'>Доставка и оплата</li></a>
        <a href='/#/wallet'><li className='header-item'>Программа лояльности</li></a>
        <a href='/#/contacts'><li className='header-item'>Контакты</li></a>
        </ul>
        <div style={{"width": "95%", "marginLeft": "2.5%", "height": "1px", "backgroundColor": "#8f8f8f"}}></div>
        <div className='header-phone-div2'>
                      <img src={phone_black} className='header-phone-icon2'/>
                      <a href='tel:+79254140444' style={{"textDecoration": "none"}} className='header-phone2'>+7 (925) 414-05-45</a>
        </div>
        <div style={{"display": "flex", "alignItems": "baseline", "gap": "5vw", "marginTop": "10px"}}>
        <a style={{"textDecoration": "none"}} href='https://wa.me/79254140444?text=' target='_blank'><div  className='header-social'>
          <img src={whatsapp} className='footer-button-arrow'/>
          <h3>WhatsApp</h3>
        </div></a>
          <a style={{"textDecoration": "none"}} href='https://t.me/retradestaff' target='_blank'><div className='header-social'>
          <img src={telegram} className='footer-button-arrow'/>
          <h3>Telegram</h3>
        </div></a>
        <a style={{"textDecoration": "none"}} href='https://www.instagram.com/retrade.ru/' target='_blank'><div  className='header-social'>
          <img src={instagram} className='footer-button-arrow'/>
          <h3>Instagram</h3>
        </div></a>
        
        </div>
        
      </div>
    </div>
  );
};

export default FullScreenWindow;