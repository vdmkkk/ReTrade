import './App.css';
import './App2.css';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import cases from './img/cases.avif'
import plenka from './img/plenka.avif'
import airtag from './img/airtag.avif'
import appletv from './img/appletv.avif'
import control from './img/control.avif'
import power from './img/power.avif'
import FullScreenWindow from './FullScreen';
import { useState } from 'react';



function Accessories() {

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

            <div style={{"paddingBottom": "150px", "marginTop": "100px"}} className='categories'>
                <h1 className='categories-title'>Лучшие устройства в одном магазине.</h1>
                <h2 className='categories-sub'>Созданы для вас.</h2>
                <ul className='categories-list'>
                <a href='/#/shop/accessories/cases'><li style={{"display": "inline"}}><div className='categories-item'>
                    <img src={cases} className='categories-img'></img>
                    <a className='categories-itemname'>Чехлы</a>
                </div></li></a>
                <a href='/#/shop/accessories/protection'><li style={{"text-align": "center"}}><div className='categories-item'>
                    <img src={plenka} className='categories-img'></img>
                    <a className='categories-itemname'>Защита</a>
                </div></li></a>
                <a href='/#/shop/accessories/airtag'><li style={{"text-align": "center"}}><div className='categories-item'>
                    <img src={airtag} className='categories-img'></img>
                    <a className='categories-itemname'>Apple AirTag</a>
                </div></li></a>
                <a href='/#/shop/accessories/appletv'><li style={{"text-align": "center"}}><div className='categories-item'>
                    <img src={appletv} className='categories-img'></img>
                    <a className='categories-itemname'>Apple TV</a>
                </div></li></a>
                <a href='/#/shop/accessories/control'><li style={{"text-align": "center"}}><div className='categories-item'>
                    <img src={control} className='categories-img'></img>
                    <a className='categories-itemname'>Управление</a>
                </div></li></a>
                <a href='/#/shop/accessories/power'><li style={{"text-align": "center"}}><div className='categories-item'>
                    <img src={power} className='categories-img'></img>
                    <a className='categories-itemname'>Питание</a>
                </div></li></a>
                </ul>
            </div>

            <FooterComponent/>
        </div>
    )
}


export default Accessories;