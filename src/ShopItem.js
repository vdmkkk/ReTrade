import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HeaderTopComponent from './HeaderTop';
import Item from './Item';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import bag from './img/bag.svg'
import Cookies from 'js-cookie';
import Cart from './Cart';
import FullScreenWindow from './FullScreen';


function ShopItem() {

    const { item } = useParams();
    const [data, setData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCartItems = () => {
      const cart = Cookies.get('cart');
      return cart === undefined ? [] : JSON.parse(cart);
    };

    const [items, setItems] = useState(getCartItems())

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };


    useEffect(() => {
      const apiUrl = 'http://89.169.3.47:53314/api/items/find/' + item.toString();

      axios.get(apiUrl)
      .then((response) => {
        var newData = response.data;
        newData.sort((a, b) => {return b["price"] - a["price"]})
        setData(newData); // Update the component state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, [item])

    useEffect(() => {
      setItems(getCartItems());
    }, [isModalOpen])

    // console.log(data)

    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

    

    return(
        <div className='App'>
            {isModalOpen && <div className="overlay" onClick={handleModalClose} />}
                
            <Cart isOpen={isModalOpen} onClose={handleModalClose} />
            <HeaderTopComponent/>
            <HeaderComponent openFullScreen={openFullScreen}/>
            <FullScreenWindow isOpen={isFullScreenOpen} onClose={closeFullScreen} />

            <img src={bag} className='shop-bag ' onClick={() => handleModalOpen()}></img>
            {items.length > 0 ? 
            <div className='shop-bag-count'>
              <h4>{items.length}</h4>
            </div> :
            <a></a>
            }
            

            <div className='shop'>
                {data.map((item) => {
                    return <Item item={item}/>;
                })}
            </div>

            <FooterComponent/>
        </div>
    )
};

export default ShopItem;