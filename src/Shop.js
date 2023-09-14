import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import iphone from './img/iphone.avif'
import watch from './img/watch.avif'
import mac_img from './img/mac.avif'
import ipad from './img/ipad.avif'
import airpods from './img/airpods.avif'
import acessories from './img/acessories.avif'
import bell from './img/bell.svg'
import ship from './img/ship.svg'
import barcode from './img/barcode.svg'
import coins from './img/coins.svg'
import FullScreenWindow from './FullScreen';
import { useState } from 'react';


function Shop() {
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };
    return(
        <div className="App">
            <HeaderTopComponent/>
            <HeaderComponent openFullScreen={openFullScreen}/>
      <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />
            <div className='categories' style={{"marginTop": "70px"}}>
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
                <ul className='pros-list' style={{"marginBottom": "70px"}}>
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
            <FooterComponent/>
        </div>
    )
}

export default Shop;