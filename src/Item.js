import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import prevArrow from './img/prevArrow.svg'
import nextArrow from './img/nextArrow.svg'
import tick from './img/tick.svg'
import arrow from './img/arrow.svg'
import Cookies from 'js-cookie';

function Item(props) {

    const item = props["item"];
    const [prices, setPrices] = useState({});
    const [pictures, setPictures] = useState({});
    const [picture_keys, setPictureKeys] = useState([]);

    if (item["prices"] === null)
    var basePrice = parseInt(item["price"])
    else
    basePrice = Math.min(...Object.values(item["prices"]))

    const [page, setPage] = useState(0)
    const [option, setOption] = useState({})
    const [price, setPrice] = useState(basePrice)

    const [mode, setMode] = useState(0)

    // const [key, setKey] = useState(false); // Add a key state



    const storageOrder = ['64 ГБ', '128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ']
    if (item["storage"] != null){
        item["storage"] = storageOrder.reduce((acc, key) => {
            if (item["storage"].hasOwnProperty(key)) {
            acc[key] = item["storage"][key];
            }
            return acc;
        }, {});
    }

    useEffect(() => {

        for (let i=0; i < Object.keys(item).length; i++){
            if (typeof item[Object.keys(item)[i]] == "object" && item[Object.keys(item)[i]] != null && Object.keys(item)[i] != 'color' && Object.keys(item)[i] != 'static_img' && Object.keys(item)[i] != 'prices'){
                var oldPrices = prices
                oldPrices[Object.keys(item)[i]] = []
                for (let j=0; j < Object.keys(item[Object.keys(item)[i]]).length; j++){
                    var old = oldPrices[Object.keys(item)[i]]
                    old.push({[Object.keys(item[Object.keys(item)[i]])[j]]: item[Object.keys(item)[i]][Object.keys(item[Object.keys(item)[i]])[j]]})
                    oldPrices[Object.keys(item)[i]] = old
                    if (Object.keys(oldPrices[Object.keys(item)[i]][0][Object.keys(oldPrices[Object.keys(item)[i]][0])[0]]["img"]).length != 0){
                        setPictureKeys(oldPrices[Object.keys(item)[i]].map((val) => {
                            return Object.keys(val)[0]
                        }))
                        var oldPics = pictures;
                        oldPics[Object.keys(item[Object.keys(item)[i]])[j]] = oldPrices[Object.keys(item)[i]][j][Object.keys(oldPrices[Object.keys(item)[i]][j])[0]]["img"]
                        setPictures(oldPics)
                    }
                }
                var oldOption = option;
                oldOption[Object.keys(item)[i]] = Object.keys(oldPrices[Object.keys(item)[i]][0])[0]
                setOption(oldOption)
                setPrices(oldPrices)    
                
            }
            if (item["color"] != null){
            if (Object.keys(item["color"])[0] === 'Варьируется'){
                setPictureKeys(item["color"]['Варьируется'])
            }
            else{
            setPictureKeys(Object.keys(item["color"]))
            setPictures(item["color"])
            }
            }
        if (item["static_img"] != null) setMode(1);
        if (item["color"] != null){
            if (Object.keys(item["color"])[0] === 'Варьируется') setMode(2);
        };
        }

    }, [option])

    // console.log(prices, option)
    
    
    // console.log(prices["storage"])

    function handleOption(where, key){
        // console.log(option)
        var newOption = option
        newOption[where] = Object.keys(key)[0]
        setOption(newOption);
        var newPrice = basePrice
        if (item["color"] == null)
        for (let i=0; i < Object.keys(option).length; i++){
            if (Object.keys(item[Object.keys(option)[i]][option[Object.keys(option)[i]]]["img"]).length > 0){
                setPage(picture_keys.indexOf(Object.keys(key)[0]) == -1 ? page : picture_keys.indexOf(Object.keys(key)[0]))
            }
        }
        else{
            for (let i=0; i < Object.keys(option).length; i++){
                if (Object.keys(item[Object.keys(option)[i]][option[Object.keys(option)[i]]]["img"]).length > 0 && Object.keys(item["color"])[0] != 'Варьируется'){
                    setPage(picture_keys.indexOf(Object.keys(key)[0]))
                }
            }
        }
        // console.log(Object.keys(item["prices"])[0].slice(1, -1).replace(/'/g, "").split(', '))
        if (item["prices"] !== null)
        for (let i=0; i<Object.keys(item["prices"]).length; i++){
            var flag = true;
            for (let j=0; j<Object.values(option).length; j++){
                if (!Object.keys(item["prices"])[i].slice(1, -1).replace(/'/g, "").split(', ').includes(Object.values(option)[j])){
                    flag = false;
                    // console.log("bruh", Object.keys(item["prices"])[i].slice(1, -1).replace(/'/g, "").split(', '), Object.values(option)[j])
                } 
            }
            // console.log(Object.keys(item["prices"])[i].slice(1, -1).replace(/'/g, "").split(', '))
            if (flag){
                newPrice = item["prices"][Object.keys(item["prices"])[i]];
                break;
            }
        }
        setPrice(newPrice)
    }

    function handlePictures(key) {
        setPage(picture_keys.indexOf(key))
    }

    function handleCart() {
        const cookieValue = Cookies.get('cart');
        if (cookieValue == undefined) var newCookie = [];
        else var newCookie = JSON.parse(cookieValue);
        var args = []
        for (let i=0; i < Object.values(option).length; i++){
            args.push(Object.values(option)[i])
        }
        if (!args.includes(picture_keys[page])) args.push(picture_keys[page]);
        if (mode === 0) var image = pictures[picture_keys[page]][0];
        if (mode === 1) var image = item["static_img"][0];
        if (mode === 2) var image = pictures[Object.values(option).filter(value => Object.keys(pictures).includes(value))][picture_keys[page]][0];
        newCookie.push({"name": item["name"], "args": args, "img": image, "price": price})
        Cookies.set('cart', JSON.stringify(newCookie))
    }

    const labels = {"storage": "Память:", "size": "Размер ремешка", "diagonal": "Диагональ:", "generation": "Поколение:", "connection": "Тип подключения:", "screen": "Экран:", "model": "Модель:", "complect": "Комплект:", "compatibility": "Совместимость:", "power": "Мощность:", "length": "Длина:"}
    const labels_pic = {"model": "Модель:", "color": "Цвет:", "power": "Мощность"}

    const settings = {
        dots: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: false,
        prevArrow: <img src={prevArrow} alt="Previous" />,
        nextArrow: <img src={nextArrow} alt="Next" />,
      };
    
    const colors = {"Фиолетовый": "rgb(88, 78, 99)", "Чёрный космос": "rgb(64, 62, 61)", "Серебристый": "rgb(239, 242, 242)", "Золотой": "rgb(244, 231, 206)", "Тёмная ночь": "rgb(49, 53, 58)", "Сияющая звезда": "rgb(239, 236, 231)", "Фиолетовый-2": "rgb(230, 215, 233)", "Голубой": "rgb(192, 207, 221)", "Красный": "rgb(225, 27, 41)", "Жёлтый": "rgb(245, 228, 136)", "Белый": "linear-gradient(rgb(245, 244, 239) 0%, rgb(210, 211, 212) 99.3%)", "Розовый": "linear-gradient(rgb(227, 84, 76) 0%, rgb(216, 159, 151) 100%)", "Зелёный": "linear-gradient(rgb(231, 236, 227) 0%, rgb(175, 191, 171) 100%)", "Серый космос": "linear-gradient(rgb(60, 61, 58) 0%, rgb(89, 87, 89) 100%)", "Синий": "rgb(67, 120, 143)", "Чёрный": "rgb(45, 44, 51)", "Голубое небо": "rgb(165, 205, 237)", "Розовое золото": "rgb(234, 200, 191)", "Оранжевый": "rgb(255, 133, 78)", "Чёрный/серый": "linear-gradient(90deg, rgb(0, 0, 0) 0.07%, rgb(94, 89, 83) 100%)", "Синий/серый": "linear-gradient(90deg, rgb(108, 142, 210) 0%, rgb(191, 180, 174) 100%)", "Жёлтый/бежевый": "linear-gradient(90deg, rgb(210, 197, 104) 0%, rgb(189, 170, 158) 100%)", "Red": "rgb(225, 27, 41)", "Midnight": "rgb(51, 52, 56)", "Canary Yellow": "rgb(245, 227, 136)", "Sky": "rgb(165, 205, 237)", "Succulent": "rgb(178, 194, 186)", "Sunglow": "rgb(253, 214, 141)", "Storm Blue": "rgb(70, 83, 92)", "Chalk Pink": "rgb(248, 222, 217)", "Lilac": "rgb(211, 196, 231)", "Iris": "rgb(118, 103, 138)", "Olive": "rgb(117, 120, 105)", "Elderberry": "rgb(81, 63, 72)", "Umber": "rgb(146, 89, 77)", "Forest Green": "rgb(80, 94, 93)", "Ink": "rgb(86, 84, 95)", "Orange": "rgb(255, 133, 78)"}
    
    // console.log(page)
    // console.log(Object.keys(pictures).filter(value => Object.values(option).includes(value)))
    //  console.log(Object.keys(item["color"])[0] !== 'Варьируется')

    return(
        <div className="item">
            {mode == 0 ? picture_keys.length > 0 && pictures[picture_keys[0]] && (
                <Slider {...settings} className="item-picture">
                    {pictures[picture_keys[page]].map((opt_key) => {

                        return (
                            <div>
                                <img className="item-picture-img" src={opt_key} alt="Item" />
                            </div>
                        )
                    })}
                </Slider>
            
            ) : mode == 1 ? (
                <Slider {...settings} className="item-picture">
                    {item["static_img"].map((opt_key) => {

                        return (
                            <div>
                                <img className="item-picture-img" src={opt_key} alt="Item" />
                            </div>
                        )
                    })}
                </Slider>
            ) : 
            ( pictures[Object.values(option).filter(value => Object.keys(pictures).includes(value))][picture_keys[page]] &&
                <Slider {...settings} className="item-picture">
                    {pictures[Object.values(option).filter(value => Object.keys(pictures).includes(value))][picture_keys[page]].map((pic) => {
                            // console.log(pic)
                            return (
                            <div>
                                <img className="item-picture-img" src={pic} alt="Item" />
                            </div>
                        )
                        
                    })}
                </Slider>
            )
            }
            <div className="item-info">
                <h1>{item["name"]}</h1>
                <h2>{item["description"]}</h2>
                {Object.keys(prices).map((key) => {
                    return (<div><h3>{labels[key]}</h3><div className="item-choose">
                    {prices[key].map((obj) => {
                        // console.log("obj", obj)
                        if (Object.keys(obj)[0] === option[key])
                            return <div className="item-option active">{Object.keys(obj)[0]}</div>
                        else
                            return <div onClick={() => handleOption(key, obj)} className="item-option">{Object.keys(obj)[0]}</div>
                    })}</div></div>)
                })}
                {item["color"] != null ? <div><h3 className="item-label">{labels_pic["color"]}</h3>
                <div className="item-color-div">
                
                {Object.keys(item["color"])[0] !== 'Варьируется' ? Object.keys(item["color"]).map( (color) => {
                    // console.log("color", color, item["color"][color])
                    if (item["color"] != null)
                    return (
                        <div onClick={() => handlePictures(color)} className="item-color" style={{"background": colors[color]}}>
                            {picture_keys[page] == color ? <img src={tick} className='item-tick'></img> : <img src={tick} style={{"display": "none"}} className='item-tick'></img>}
                        </div>
                        
                        
                    )
                }): item["color"]['Варьируется'].map( (color) => {
                    // console.log("color", color, item["color"]["Варьируется"][color])
                    if (item["color"] != null)
                    return (
                        <div onClick={() => handlePictures(color)} className="item-color" style={{"background": colors[color]}}>
                            {picture_keys[page] == color ? <img src={tick} className='item-tick'></img> : <img src={tick} style={{"display": "none"}} className='item-tick'></img>}
                        </div>
                        
                        
                    )
                })}
                </div>
                
                </div> : <a></a>}
            <div className="item-bottom">
                <div onClick={() => handleCart()} className="item-cart"><a>В корзину</a><img src={arrow}></img></div>
                <a className="item-price">{price.toLocaleString('ru')} ₽</a>
            </div>
            
            </div>
        </div>
    )
}

export default Item;