import logo from './img/logo.png'
import phone_black from './img/phone_black.svg'
import menu from './img/menu.svg'
import './App.css';
import './App2.css';

const HeaderComponent = ({ openFullScreen }) => {

    return (
            <div className='header2'>
                <div className='header2-container'>
                    <img onClick={openFullScreen} src={menu} className='header-menu' />
                    <a className='header-logo-container' href='/#/'><img className='header-logo' src={logo} draggable={false}></img></a>
                    <ul className='header2-list'>
                        <a href='/#/shop/iphone'><li className='header2-item'><a>iPhone</a></li></a>
                        <a href='/#/shop/airpods'><li className='header2-item'><a>AirPods</a></li></a>
                        <a href='/#/shop/mac'><li className='header2-item'><a>Mac</a></li></a>
                        <a href='/#/shop/ipad'><li className='header2-item'><a>iPad</a></li></a>
                        <a href='/#/shop/watch'><li className='header2-item'><a>Watch</a></li></a>
                        <a href='/#/shop/accessories'><li className='header2-item'><a>Аксессуары</a></li></a>
                    </ul>

                    <a href='tel:+79254140444'><div className='header-phone-div'>
                      <img src={phone_black} className='header-phone-icon'/>
                      <a  className='header-phone'>+7 (925) 414-04-44</a>
                    </div></a>
                </div>
                
            </div>
      );
}


export default HeaderComponent;