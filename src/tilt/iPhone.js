import HeaderComponent from '../Header';
import FooterComponent from '../Footer';
import HeaderTopComponent from '../HeaderTop';
import Item from '../Item';
import { useParams } from 'react-router-dom';
import { useEffect, useState, componentWillReceiveProps } from 'react';
import axios from 'axios';
import bag from '../img/bag.svg'
import Cookies from 'js-cookie';
import Cart from '../Cart';
import FullScreenWindow from '../FullScreen';


function IPhone() {

    const item  = "iphone"
    const [data, setData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [items, setItems] = useState([Cookies.get('cart') == undefined ? [] : JSON.parse(Cookies.get('cart'))])

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };


    useEffect(() => {

      const apiUrl = 'http://92.118.114.90:53314/api/items/find/' + item.toString();
      
      console.log(Cookies.get('cart'))
      if (Cookies.get('cart') == undefined) var v = [];
      else var v = JSON.parse(Cookies.get('cart'));
      if (v !== items){
        setItems(Cookies.get('cart') == undefined ? [] : JSON.parse(Cookies.get('cart')))
      }

        if (data.length == 0){
          axios.get(apiUrl)
      .then((response) => {
        var newData = response.data;
        newData.sort((a, b) => {return b["price"] - a["price"]})
        setData(newData); // Update the component state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

        }


        
    }, [items])

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

export default IPhone;