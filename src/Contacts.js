import './App.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import FullScreenWindow from './FullScreen';
import { useState } from 'react';

function Contacts() {
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };
    return(
        <YMaps>
        <div className='App'>
        <HeaderTopComponent/>
        <HeaderComponent openFullScreen={openFullScreen}/>
      <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />

            <div className='contacts'>
                <h1>Контакты</h1>
                <h2>Приезжайте за покупками в наш уютный магазин на Юго-Западе Москвы.</h2>

                <div className='contacts-container'>
                    <div className='contacts-adress'>
                        <h2>адрес магазина</h2>
                        <h1>Москва, ул. Рябиновая 55 строение 9</h1>
                        <h2>режим работы</h2>
                        <h1>10:00 — 21:00, без выходных.</h1>
                    </div>
                    <div className='contacts-buttons'>
                        <a target="_blank" href='https://yandex.ru/maps/213/moscow/?ll=37.638083%2C55.720955&mode=routes&rtext=~55.691389%2C37.432349&rtt=pd&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D84603051138&z=12.6'>Построить маршрут</a>
                        <a target="_blank" href='https://3.redirect.appmetrica.yandex.com/route?&end-lat=55.691389&end-lon=37.432349&level=comfort&ref=ретрейд.рф&appmetrica_tracking_id=25395763362139037&lang=ru'>Вызвать такси</a>
                    </div>
                </div>
                
                <div className='contacts-map'>
                    <Map width="90%" height="350px" defaultState={{ center: [55.691389, 37.432349], zoom: 14 }}>
                        <Placemark geometry={[55.691389, 37.432349]} properties={{hintContent: "Retrade"}} options={{iconColor: "#000", hintContent: "ReTrade"}}/>
                    </Map>
                </div>
                
            </div>

            <FooterComponent/>
        </div>
        </YMaps>
    )
}


export default Contacts;