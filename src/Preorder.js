import './App.css';
import arrow_black from './img/arrow_black.svg'
import telegram from './img/telegram.svg'
import instagram from './img/instagram.svg'
import logo_white from './img/logo_white.svg'
import phone from './img/phone.svg'
import logo from './img/logo.svg'
import phone_icon from './img/phone_icon.svg'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import FullScreenWindow from './FullScreen';
import book from './img/book.svg'
import iphone15_1 from './img/iphone15_1.avif'
import iphone15_2 from './img/iphone15_2.avif'
import iphone15_3 from './img/iphone15_3.avif'
import { useState } from 'react';
import PreorderForm from './PreorderForm';



function Preorder() {
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const handleModalOpen1 = () => {
    setIsModalOpen1(true);
  };

  const handleModalClose1 = () => {
    setIsModalOpen1(false);
  };
    return(
        <div className="App">
            <HeaderTopComponent/>
            <HeaderComponent openFullScreen={openFullScreen}/>
      <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />

                {isModalOpen && <div className="overlay" onClick={handleModalClose} />}
                <PreorderForm isOpen={isModalOpen} onClose={handleModalClose} option={1} />
                {isModalOpen1 && <div className="overlay" onClick={handleModalClose1} />}
                <PreorderForm isOpen={isModalOpen1} onClose={handleModalClose1} option={2} />

                <div className='preorder-header'>
                <h1 style={{"fontSize": "15px", "marginLeft": 0, "marginTop": "80px"}} className='featured-title-top'>Предзаказ</h1>
                <h1 style={{"fontSize": "30px", "width": "520px", "marginLeft": 0, "marginTop": "20px"}} className='featured-title'>Станьте обладателем новинок Apple  в числе первых.</h1>
                <ul style={{"marginLeft": 0, "marginTop": "40px"}} className='pros-list'>
                    <li className='pros-li'><div style={{"maxWidth": "440px", "marginLeft": 0}} className='pros-div'>
                        <div className='pros-wrapper'><img src={book} className='pros-img'/><span className='pros-title'>Оставьте заявку на сайте</span></div>
                        <a className='pros-text'>Мы добавим вас в лист ожидания. Вносить предоплату или задаток не нужно.</a>
                    </div></li>
                    <li className='pros-li'><div style={{"maxWidth": "440px", "marginLeft": 0}} className='pros-div'>
                        <div className='pros-wrapper'><img src={phone_icon} className='pros-img'/><span className='pros-title'>Старт продаж</span></div>
                        <a className='pros-text'>Когда устройства будут в наличии, мы свяжемся с вами и сориентируем по стоимости на старте продаж. </a>
                    </div></li>
                </ul>
                </div>

                <div className='preorder-options'>
                    <div style={{"margin-right": "40px"}} className='preorder-option'>
                        <img src={iphone15_1}></img>
                        <h1>iPhone 15 Pro и 15 Pro Max</h1>
                        <h2 style={{"marginTop": "20px"}}>Старт продаж 22 сентября.</h2>
                        <h2>Цена будет известна на старте продаж.</h2>
                        <div onClick={handleModalOpen}>
                            <h3 className='preorder-button'>Оставить заявку</h3>
                        </div>
                    </div>

                    <div style={{"margin-left": "40px"}} className='preorder-option'>
                        <img src={iphone15_2}></img>
                        <h1>iPhone 15  и 15 Plus</h1>
                        <h2 style={{"marginTop": "20px"}}>Старт продаж 22 сентября.</h2>
                        <h2>Цена будет известна на старте продаж.</h2>
                        <div onClick={handleModalOpen1}>
                            <h3 className='preorder-button'>Оставить заявку</h3>
                        </div>
                    </div>
                </div>

                <div className='preorder-extras'>
                    <div style={{"width": "60%"}}>
                        <div style={{"height": "1px", "width": "100%", "backgroundColor": "#ccc"}}/>
                        <h2>Когда будет старт продаж?</h2>
                        <h3>Мировой старт продаж – 22 сентября. Телефоны будут в наличии в нашем магазине 22-23 сентября.</h3>
                        <div style={{"height": "1px", "width": "100%", "backgroundColor": "#ccc"}}/>
                        <h2>Какие будут цены на старте продаж?</h2>
                        <h3>Цена будет известна только когда техника будет в наличии в Москве в нашем магазине. Она будет выше официальных цен из-за дефицита и высокого спроса.</h3>
                        <div style={{"height": "1px", "width": "100%", "backgroundColor": "#ccc"}}/>
                        <h2>Будет ли версия на 2 терабайта?</h2>
                        <h3>Apple не представила такой объем памяти и его не будет. iPhone 15 Pro Max: 256gb, 512gb, 1tb; iPhone 15 Pro: 128gb, 256gb, 512gb, 1tb; iPhone 15 и 15 Plus: 128gb, 256gb, 512gb.</h3>
                        <div style={{"height": "1px", "width": "100%", "backgroundColor": "#ccc"}}/>
                    </div>
                    <img src={iphone15_3}/>
                    
                </div>


            <FooterComponent/>
        </div>
    )
}


export default Preorder;