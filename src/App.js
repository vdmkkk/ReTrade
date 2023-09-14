import './App.css';
import './App2.css';
import logo from './img/logo.svg'
import logo_white from './img/logo_white.svg'
import arrow from './img/arrow.svg'
import arrow_black from './img/arrow_black.svg'
import mac from './img/macbook.avif'
import iphone15 from './img/iphone15.avif'
import iphone from './img/iphone.avif'
import watch from './img/watch.avif'
import mac_img from './img/mac.avif'
import ipad from './img/ipad.avif'
import airpods from './img/airpods.avif'
import acessories from './img/acessories.avif'
// import console from './img/consoles.avif'
import bell from './img/bell.svg'
import ship from './img/ship.svg'
import barcode from './img/barcode.svg'
import coins from './img/coins.svg'
import wallet from './img/wallet.svg'
import loyalty from './img/loyalty.avif'
import footer from './img/footer.avif'
import telegram from './img/telegram.svg'
import instagram from './img/instagram.svg'
import phone from './img/phone.svg'
import phone_black from './img/phone_black.svg'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import FullScreenWindow from './FullScreen';
import { HashRouter, Routes, Route, Switch } from 'react-router-dom';
import Warranty from './Warranty';
import Delivery from './Delivery';
import Loyalty from './Loyalty';
import Contacts from './Contacts';
import Shop from './Shop';
import ShopItem from './ShopItem';
import Accessories from './Acessories';
import IPhone from './tilt/iPhone';
import AirPods from './tilt/AirPods';
import Ipad from './tilt/Ipad';
import Watch from './tilt/Watch';
import Cases from './tilt/Cases';
import Mac from './tilt/Mac';
import close from './img/close.svg'
import Preorder from './Preorder';

function App() {
  return (
    // <HashRouter basename="/app">
      <Routes>
        <Route path="/" exact element={<AppMain/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/warranty" element={<Warranty/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/delivery" element={<Delivery/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/wallet" element={<Loyalty/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/contacts" element={<Contacts/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop" element={<Shop/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/accessories" element={<Accessories/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/:item" element={<ShopItem/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/iphone" element={<IPhone/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/airpods" element={<AirPods/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/ipad" element={<Ipad/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/watch" element={<Watch/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/cases" element={<Cases/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/mac" element={<Mac/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/shop/accessories/:item" element={<ShopItem/>} /> {/* 👈 Renders at /#/app/ */}
        <Route path="/preorder" element={<Preorder/>} /> {/* 👈 Renders at /#/app/ */}
      </Routes>
      // </HashRouter>
  );
}

function AppMain() {

  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [warning, setWarning] = useState(true)

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };


  return (
    <div className="App">
      <HeaderTopComponent/>
      <HeaderComponent openFullScreen={openFullScreen}/>
      <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />

      <div className='featured'>
      <h1 className='featured-title-top'>Предзаказ</h1>
        <h1 className='featured-title'>Станьте обладателем новинок Apple  в числе первых.</h1>
        <h2 className='featured-description'>iPhone 15 и 15 Pro.</h2>
        <div className='featured-button-wrapper'>
        <a href='#/preorder'><div className='featured-button'>
          <div className='featured-button-span'>
            <img className='featured-arrow' src={arrow}></img>
            <span className='featured-button-text'>Подробнее</span>
          </div>
        </div></a>
        </div>
        <img className='featured-picture' src={iphone15}></img>
      </div>

      <div className='categories'>
        <h1 className='categories-title'>Лучшие устройства в одном магазине.</h1>
        <h2 className='categories-sub'>Созданы для вас.</h2>
        <ul className='categories-list'>
          <a href='/#/shop/iphone'><li style={{"display": "inline"}}><div className='categories-item'>
            <img src={iphone} className='categories-img'></img>
            <a className='categories-itemname'>iPhone</a>
          </div></li></a>
          <a href='/#/shop/watch'><li style={{"text-align": "center"}}><div className='categories-item'>
            <img src={watch} className='categories-img'></img>
            <a className='categories-itemname'>Watch</a>
          </div></li></a>
          <a href='/#/shop/mac'><li style={{"text-align": "center"}}><div className='categories-item'>
            <img src={mac_img} className='categories-img'></img>
            <a className='categories-itemname'>Mac</a>
          </div></li></a>
          <a href='/#/shop/airpods'><li style={{"text-align": "center"}}><div className='categories-item'>
            <img src={airpods} className='categories-img'></img>
            <a className='categories-itemname'>AirPods</a>
          </div></li></a>
          <a href='/#/shop/ipad'><li style={{"text-align": "center"}}><div className='categories-item'>
            <img src={ipad} className='categories-img'></img>
            <a className='categories-itemname'>iPad</a>
          </div></li></a>
          <a href='/#/shop/accessories'><li style={{"text-align": "center"}}><div className='categories-item'>
            <img src={acessories} className='categories-img'></img>
            <a className='categories-itemname'>Аксессуары</a>
          </div></li></a>
        </ul>
        <ul className='pros-list'>
          <li className='pros-li'><div className='pros-div'>
            <div className='pros-wrapper'><img src={ship} className='pros-img'/><span className='pros-title'>Доставка</span></div>
            <a className='pros-text'>Доставка по Москве в день заказа сотрудниками компании. Доставка по России надежными курьерскими службами.</a>
          </div></li>
          <li className='pros-li'><div className='pros-div'>
            <div className='pros-wrapper'><img src={bell} className='pros-img'/><span className='pros-title'>Клиентский сервис</span></div>
            <a className='pros-text'>Премиальное обслуживание. Личный консьерж в мире Apple. Бесплатная консультация и техническая поддержка.</a>
          </div></li>
          <li className='pros-li'><div className='pros-div'>
            <div className='pros-wrapper'><img src={coins} className='pros-img'/><span className='pros-title'>Программа лояльности</span></div>
            <a className='pros-text'>Карта Wallet в вашем телефоне. Получайте бонусные баллы с каждой покупки. Один бонус - один рубль.</a>
          </div></li>
          <li className='pros-li'><div className='pros-div'>
            <div className='pros-wrapper'><img src={barcode} className='pros-img'/><span className='pros-title'>Оригинальная техника</span></div>
            <a className='pros-text'>Мы продаем только новую и оригинальную технику Apple, Harman, DJI, Pitaka уже более десяти лет. Гарантия на всю технику один год.</a>
          </div></li>
        </ul>
      </div>

      {/* <div className='loyalty'>
        <img src={loyalty} className='loyalty-img'/>
        <div className='loyalty-block'>
          <h1 className='loyalty-title'>Программа лояльности</h1>
          <h2 className='loyalty-description'>Получайте баллы с каждой покупки. 1 бонус — 1 рубль.</h2>
          <div className='loyalty-button'>
            <img src={wallet} className='loyalty-purse'/>
            <span className='loyalty-text'>Совсем скоро</span>
          </div>
          <h3 className='loyalty-footer'>Публичная оферта</h3>
        </div>
      </div> */}
      <div className='warning' style={{"display": warning ? "flex" : "none"}}>
        <h3>Уважаемые клиенты, в связи с нестабильным курсом валюты, цены на сайте могут быть не актуальны</h3>
        <img onClick={() => setWarning(false)} src={close} />
      </div>
      <FooterComponent/>
    </div>
  );
}

export default App;
