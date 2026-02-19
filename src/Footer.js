import arrow_black from './img/arrow_black.svg'
import telegram from './img/telegram.svg'
import instagram from './img/instagram.svg'
import logo_white from './img/logo_white.png'
import phone from './img/phone.svg'
import logo from './img/logo.svg'
import phone_black from './img/phone_black.svg'
import React, { useState } from 'react';
import Support from './Support'


const FooterComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    return (
        <div style={{"overflowY": isModalOpen ? "revert" : "auto"}} className='footer'>
                {isModalOpen && <div className="overlay" onClick={handleModalClose} />}
                
                <Support isOpen={isModalOpen} onClose={handleModalClose} />
                <div style={{"height": "50px"}}/>
                <div className='footer-img'>
                <div style={{"height": "50px"}}/>
                <h1 className='footer-title'>Всегда рядом</h1>
                <h2 className='footer-description'>Оставьте заявку и мы свяжемся с вами в ближайшее время.</h2>
                <div className='footer-container'>
                    <div onClick={handleModalOpen} className='footer-button'>
                    <h3 className='footer-button-text-first'>Обратная связь</h3>
                    <img src={arrow_black} className='footer-button-arrow'/>
                    </div>
                    <a href='https://t.me/retradestaff' target='_blank'><div className='footer-social'>
                    <img src={telegram} className='footer-button-arrow'/>
                    <h3 className='footer-button-text'>Telegram</h3>
                    </div></a>
                    <a href='https://www.instagram.com/retrade.ru/' target='_blank'><div className='footer-social'>
                    <img src={instagram} className='footer-button-arrow'/>
                    <h3 className='footer-button-text'>Instagram</h3>
                    </div></a>
                </div>
                </div>
                <div style={{"height": "50px"}}/>
                <div className='footer-later'>
                <img src={logo_white} className='footer-logo'/>
                <div className='footer-phone-div'>
                    <img src={phone} className='footer-phone-icon'/>
                    <a href='tel:+79254140444' className='footer-phone'>+7 (925) 414-05-45</a>
                </div>
                </div>
                <h4 className='footer-extra'>
                Сайт носит сугубо информационный характер и не является публичной офертой, определяемой Статьей 437 (2) ГК РФ. Apple, логотип Apple и изображения Apple являются зарегистрированными товарными знаками компании Apple Inc. в США и других странах. App Store является знаком обслуживания компании Apple Inc. Instagram принадлежит компании Meta, признанной экстремистской организацией и запрещенной в РФ.
                </h4>
            </div>
      );
}


export default FooterComponent;