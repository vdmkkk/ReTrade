import telegram from './img/telegram_black.svg'
import instagram from './img/instagram_black.svg'
import whatsapp from './img/whatsapp_black.svg'

const HeaderTopComponent = () => {

    return (
        <header className="App-header">
        <ul className='header-list'>
        <a href='/#/shop'><li className='header-item'>Каталог</li></a>
        <a href='/#/warranty'><li className='header-item'>Гарантия</li></a>
        <a href='/#/delivery'><li className='header-item'>Доставка и оплата</li></a>
        <a href='/#/wallet'><li className='header-item'>Программа лояльности</li></a>
        <a href='/#/contacts'><li className='header-item'>Контакты</li></a>
        </ul>
        <div style={{"display": "flex"}}>
        <a style={{"textDecoration": "none"}} href='https://wa.me/79254140444?text=' target='_blank'><div style={{"marginLeft": "5vw"}} className='header-social'>
          <img src={whatsapp} className='footer-button-arrow'/>
          <h3>WhatsApp</h3>
        </div></a>
          <a style={{"textDecoration": "none"}} href='https://t.me/retradestaff' target='_blank'><div style={{"marginLeft": "1vw"}} className='header-social'>
          <img src={telegram} className='footer-button-arrow'/>
          <h3>Telegram</h3>
        </div></a>
        <a style={{"textDecoration": "none"}} href='https://www.instagram.com/retrade.ru/' target='_blank'><div style={{"marginLeft": "1vw"}} className='header-social'>
          <img src={instagram} className='footer-button-arrow'/>
          <h3>Instagram</h3>
        </div></a>
        
        </div>
        
        </header>
      );
}


export default HeaderTopComponent;