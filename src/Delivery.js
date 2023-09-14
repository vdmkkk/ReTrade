import './App.css';
import arrow_black from './img/arrow_black.svg'
import telegram from './img/telegram.svg'
import instagram from './img/instagram.svg'
import logo_white from './img/logo_white.svg'
import phone from './img/phone.svg'
import logo from './img/logo.svg'
import phone_black from './img/phone_black.svg'
import ship from './img/ship.svg'
import shop from './img/shop.svg'
import delivery from './img/delivery.svg'
import cash from './img/cash.svg'
import card from './img/card.svg'
import qr from './img/qr.svg'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import FullScreenWindow from './FullScreen';
import { useState } from 'react';

function Delivery() {
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

            <div className='delivery1'>
                <h1>Доставка и оплата</h1>
                <h2>С нами надёжно.</h2>
                
                <ul className='pros-list'>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={shop} className='pros-img'/><span className='pros-title'>Самовывоз</span></div>
                        <a className='pros-text'>Вы можете забрать свой заказ в нашем магазине с 10:00 до 21:00 ежедневно. Услуга действует при оформлении заказа с 10:00 до 20:00.</a>
                    </div></li>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={delivery} className='pros-img'/><span className='pros-title'>Доставка по Москве</span></div>
                        <a className='pros-text'>Доставка заказа в день обращения собственными сотрудниками компании. Обычно все заказы доставляются за 1-2 часа после оформления. Бесплатная доставка от 30 тыс. р., в других случаях — 490 р. </a>
                    </div></li>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={ship} className='pros-img'/><span className='pros-title'>Доставка по России</span></div>
                        <a className='pros-text'>Экспресс-доставка по России курьерской службой СДЭК. Бережная упаковка и возможность отслеживать заказ. Отправляем заказы при полной оплате. Стоимость доставки — 490 р. </a>
                    </div></li>
                </ul>
            </div>

            <div className='delivery2'>
                <h2>Оплата.</h2>

                <ul className='pros-list'>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={cash} className='pros-img'/><span className='pros-title'>Наличный расчёт</span></div>
                        <a className='pros-text'>На данный момент оплатить заказ как при самовывозе, так и при доставке по Москве и области можно только наличными. Рядом с нами есть много банкоматов (СБЕР, Альфа-Банк, Тинькофф, ВТБ, Русский Стандарт).</a>
                    </div></li>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={card} className='pros-img'/><span className='pros-title'>Банковский перевод</span></div>
                        <a className='pros-text'>Для клиентов из других регионов оплата возможна банковским переводом. Мы принимаем полную оплату до отправки заказа.</a>
                    </div></li>
                    <li className='pros-li'><div className='pros-div'>
                        <div className='pros-wrapper'><img src={qr} className='pros-img'/><span className='pros-title'>QR-код</span></div>
                        <a className='pros-text'>Региональные заказы также могут быть оплачены QR-кодом на снятие наличных. Это безопасно, быстро и без комиссии, но данная опция, к сожалению, доступна только для держателей карт Тинькофф.</a>
                    </div></li>
                </ul>
            </div>

            <FooterComponent/>
        </div>
    )
}

export default Delivery;