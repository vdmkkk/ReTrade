import React, { useState, useRef, useEffect } from 'react';
import close from './img/close.svg'
import Cookies from 'js-cookie';
import tick from './img/tick_black.svg'
import radio from './img/cart-radio.svg'
import cartEmpty from './img/cart-empty.svg'
import axios from 'axios';

const Cart = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    const [items, setItems] = useState([])
    const [delivery, setDelivery] = useState(1)
    const [flag, setFlag] = useState(false)
    const [sum, setSum] = useState(0)
    const [flag1, setFlag1] = useState(false);
    
    useEffect(() => {
    // console.log(Cookies.get('cart'))
    setItems(Cookies.get('cart') == undefined ? [] : JSON.parse(Cookies.get('cart')));
    setSum(items.reduce((partialSum, a) => partialSum + a["price"], 0));
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
        }
    };
    
    if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };

    
    }, [isOpen, onClose, flag]);


      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [comment, setComment] = useState('');
      const [dropdownValue, setDropdownValue] = useState('');
      const [adress, setAdress] = useState('');
      const [statusMessage, setStatusMessage] = useState('');
    
      const handleNameChange = (e) => {
        setName(e.target.value);
      };
    
      const handlePhoneChange = (e) => {
        setPhone(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handleCommentChange = (e) => {
        setComment(e.target.value);
      };
    
      const handleDropdownChange = (e) => {
        setDropdownValue(e.target.value);
      };
    
      const handleModalClose = () => {
        setName('');
        setPhone('');
        setEmail('');
        setComment('');
        setDropdownValue('');
        onClose();
      };

      const handleAdressChange = (e) => {
        setAdress(e.target.value);
      };

      function handleDelete(item) {
        var newItems = items
        newItems.splice(newItems.indexOf(item), 1);
        setItems(newItems);
        Cookies.set("cart", JSON.stringify(newItems));
        setFlag(!flag);
      }

      async function handleSubmit() {

        if (name == '' || phone == '' || (delivery === 2 && adress === '') || (delivery === 3 && adress === '')) {
          setFlag1(true)
          return;
        }

        var itemsString = ""
        for (let i=0; i<items.length; i++) {
          itemsString += `Наименование: ${items[i]["name"]}\nСпецификация: ${items[i]["args"]}\nЦена: ${items[i]["price"]}\n-----------------------------------------------\n`
        }
    
        const formData = {
          "recipient": "re.trade@bk.ru",
          "subject": "Оформление заказа",
          "text": `Клиент оформил заказ.\n\nФИО: ${name}\nКонтактный номер телефона: ${phone}\nEmail: ${email == '' ? "Не указан" : email}\nСпособ связи: ${dropdownValue == "option1" ? "Перезвонить" : "Написать в Telegram"}\nКомментарий: ${comment}\nСпособ доставки: ${delivery === 1 ? "Самовывоз" : delivery === 2 ? "Доставка по Москве" : "Доставка по России"}\nАдрес: ${adress === '' ? "Не указан" : adress}\n\nТовары:\n-----------------------------------------------\n` + itemsString + `Сумма: ${sum.toLocaleString('ru')} ₽\nСтоимость доставки: ${sum < 29990 && delivery !== 1 ? "490 ₽" : delivery === 3 ? "490 ₽" : "Бесплатно"}\n\nОбщая сумма: ${sum < 29990  && delivery !== 1 ? (sum + 490).toLocaleString('ru') : delivery === 3 ? (sum + 490).toLocaleString('ru') : sum.toLocaleString('ru')} ₽`,
        };
    
        onClose();
    
        try {
          const response = await axios.post('http://89.169.3.47:53314/api/send-email', formData);
    
          if (response.status === 200) {
            setStatusMessage('Email sent successfully!');
            console.log("success")
          }
        } catch (error) {
          setStatusMessage('Failed to send email. Please try again later.');
          console.error('Error sending email:', error);
          console.log('error')
        }
      }
    
      if (!isOpen) return null;
      
      if (items.length > 0)
      return (
        <div className="cart">
          <div className="cart-content">
            <div className='modal-close'>
                <img onClick={handleModalClose} src={close}/>
            </div>

            
            <div className='cart-items'>
                <h2>Корзина</h2>
                {items.map((item) => {
                    return(
                        <div className='cart-item'>
                            <img src={item["img"]}></img>
                            <div>
                              <h3>{item["name"]}</h3>
                              {item["args"].map((arg) => {
                                return (
                                  <h4>{arg} </h4>
                                )
                              })}
                              <h3 style={{"textAlign": "end", "marginTop": "10px", "fontSize": "15px", "position": "absolute", "right": "30px", "bottom": "-25px"}}>{item["price"].toLocaleString('ru')} ₽</h3>
                            </div>
                            <img onClick={() => handleDelete(item)} style={{"opacity": .5, "width": "16px", "cursor": "pointer", "position": "absolute", "right": "-10px", "top": "20px"}} src={close}/>
                            
                        </div>
                    )
                })}
                <div className='cart-sum'>
                  <h3 style={{"width": "fit-content", "fontSize": "15px", "marginTop": "30px", "marginBottom": "0px"}}>Сумма</h3>
                  <h3 style={{"width": "fit-content", "fontSize": "15px", "marginTop": "30px", "marginBottom": "0px"}}>{sum.toLocaleString('ru')} ₽</h3>
                </div>
                <div className='cart-sum'>
                  <h3 style={{"width": "fit-content", "fontSize": "15px", "marginTop": "10px"}}>Доставка</h3>
                  <h3 style={{"width": "fit-content", "fontSize": "15px", "marginTop": "10px"}}>{sum < 29990 && delivery !== 1 ? "490 ₽" : delivery === 3 ? "490 ₽" : "Бесплатно"}</h3>
                </div>
                <div className='cart-line'/>
                <div className='cart-sum'>
                  <h3 style={{"width": "fit-content", "fontSize": "18px", "marginTop": "10px"}}>Итого</h3>
                  <h3 style={{"width": "fit-content", "fontSize": "18px", "marginTop": "10px"}}>{sum < 29990  && delivery !== 1 ? (sum + 490).toLocaleString('ru') : delivery === 3 ? (sum + 490).toLocaleString('ru') : sum.toLocaleString('ru')} ₽</h3>
                </div>
                
            </div>
            <div className='cart-info'>
                <h2>Оформить заказ</h2>
        
                <h3>Ваше ФИО *</h3>
                <input required={true} type="text" value={name} onChange={handleNameChange} />

                <h3>Контактный номер телефона *</h3>
                <input required={true} type="text" value={phone} onChange={handlePhoneChange} />

                <h3>Email</h3>
                <input type="text" value={email} onChange={handleEmailChange} />

                <h3>Как с вами связаться</h3>
                <select value={dropdownValue} onChange={handleDropdownChange}>
                <option value="option1">Перезвонить</option>
                <option value="option2">Написать в Telegram</option>
                </select>

                <h3>Комментарий</h3>
                <input type="text" value={comment} onChange={handleCommentChange} />

                <h3>Доставка</h3>

                <div onClick={()=>setDelivery(1)} className={delivery == 1 ? 'cart-shipping cart-active' : 'cart-shipping'}>
                    <h3 style={{"display": "inline"}}>Самовывоз – </h3><h3 style={{"display": "inline", "paddingLeft": 0, "opacity": .7}}>Бесплатно</h3>
                    {delivery == 1 ? <img src={tick}></img> : <div/>}
                    <h4>Москва, ул. Рябиновая 55 строение 9, Магазин работает ежедневно с 10:00 до 21:00.</h4>
                </div>

                <div onClick={()=>setDelivery(2)} className={delivery == 2 ? 'cart-shipping cart-active' : 'cart-shipping'}>
                    <h3 style={{"display": "inline"}}>Доставка по Москве – </h3><h3 style={{"display": "inline", "paddingLeft": 0, "opacity": .7}}>{sum < 29990 && delivery !== 1 ? "490 ₽" : delivery === 3 ? "490 ₽" : "Бесплатно"}</h3>
                    {delivery == 2 ? <img src={tick}></img> : <div/>}
                    <h4>Сотрудники компании бережно и быстро доставят ваш заказ в пределах МКАД.</h4>
                </div>

                <div onClick={()=>setDelivery(3)} className={delivery == 3 ? 'cart-shipping cart-active' : 'cart-shipping'}>
                    <h3 style={{"display": "inline"}}>Доставка по России – </h3><h3 style={{"display": "inline", "paddingLeft": 0, "opacity": .7}}>490 ₽</h3>
                    {delivery == 3 ? <img src={tick}></img> : <div/>}
                    <h4>Отправляем заказы по России курьерской службой СДЭК при полной оплате.</h4>
                </div>

                {delivery == 1 ? 
                <div>
                    <h3>Способ оплаты</h3>
                    <div style={{"display": "flex", "flexDirection": "row"}}><img style={{"width": "22px"}} src={radio}/><h3 style={{"paddingLeft": "4px"}}>Наличный рассчет</h3></div>
                </div> :
                delivery == 2 ?
                <div>
                    <h3>Адрес *</h3>
                    <input required={true} type="text" value={adress} onChange={handleAdressChange} />
                    <h3>Способ оплаты</h3>
                    <div style={{"display": "flex", "flexDirection": "row"}}><img style={{"width": "22px"}} src={radio}/><h3 style={{"paddingLeft": "4px", "margin": "0px"}}>Наличный рассчет</h3></div>
                </div> :
                <div>
                    <h3>Город и адрес пункта выдачи СДЭК *</h3>
                    <input required={true} type="text" value={adress} onChange={handleAdressChange} />
                    <h3>Способ оплаты</h3>
                    <div style={{"display": "flex", "flexDirection": "row"}}><img style={{"width": "22px"}} src={radio}/><h3 style={{"paddingLeft": "4px"}}>Банковский перевод</h3></div>
                </div>}
                <h3 style={{"fontSize": "12px", "color": "#f00", "textAlign": "center", "display": flag1 ? "initial" : "none"}}>Все обязательные поля должны быть заполнены!</h3>
                <div onClick={() => handleSubmit()} className='cart-submit'>
                    Отправить заказ
                </div>
            </div>
            
            
          </div>
        </div>
      );
      else
      return(
        <div className="cart">
          <div style={{"display": "block", "textAlign": "center"}} className="cart-content">
            <div className='modal-close'>
                <img onClick={handleModalClose} src={close}/>
            </div>
            <img style={{"width": "20%", "alignSelf": "center"}} src={cartEmpty} />
            <h1 style={{"textAlign": "center", "fontWeight": "500", "fontSize": "24px"}}>Корзина пуста</h1>
          </div>
        </div>
      )
    };
    
    export default Cart;