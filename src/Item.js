import { useEffect, useMemo, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import prevArrow from './img/prevArrow.svg'
import nextArrow from './img/nextArrow.svg'
import tick from './img/tick.svg'
import arrow from './img/arrow.svg'
import Cookies from 'js-cookie';

function Item(props) {

    const parseJsonField = (value, fallback) => {
        if (value == null) return fallback;
        if (typeof value === "string") {
            try {
                return JSON.parse(value);
            } catch (error) {
                return fallback;
            }
        }
        return value;
    };

    const storageOrder = ['64 ГБ', '128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ'];
    const rawItem = props["item"] || {};
    const item = useMemo(() => {
        const parsedStorage = parseJsonField(rawItem["storage"], null);
        let orderedStorage = parsedStorage;

        if (parsedStorage != null && typeof parsedStorage === "object" && !Array.isArray(parsedStorage)) {
            orderedStorage = storageOrder.reduce((acc, key) => {
                if (Object.prototype.hasOwnProperty.call(parsedStorage, key)) {
                    acc[key] = parsedStorage[key];
                }
                return acc;
            }, {});
        }

        return {
            ...rawItem,
            storage: orderedStorage,
            color: parseJsonField(rawItem["color"], null),
            prices: parseJsonField(rawItem["prices"], null),
            static_img: parseJsonField(rawItem["static_img"], null),
        };
    }, [rawItem]);

    const getFirstImage = () => {
        if (Array.isArray(item["static_img"]) && item["static_img"].length > 0) {
            return item["static_img"][0];
        }

        if (item["color"] && typeof item["color"] === "object") {
            const colorValues = Object.values(item["color"]);
            for (const colorValue of colorValues) {
                if (Array.isArray(colorValue) && colorValue.length > 0) {
                    return colorValue[0];
                }
            }
        }

        if (item["storage"] && typeof item["storage"] === "object") {
            const storageValues = Object.values(item["storage"]);
            for (const storageValue of storageValues) {
                if (storageValue && typeof storageValue === "object" && Array.isArray(storageValue["img"]) && storageValue["img"].length > 0) {
                    return storageValue["img"][0];
                }
            }
        }

        return "";
    };
    const [prices, setPrices] = useState({});
    const [pictures, setPictures] = useState({});
    const [picture_keys, setPictureKeys] = useState([]);

    const fallbackPrice = Number.parseInt(item["price"], 10);
    if (item["prices"] == null || Object.keys(item["prices"]).length === 0)
    var basePrice = Number.isNaN(fallbackPrice) ? 0 : fallbackPrice
    else
    basePrice = Math.min(...Object.values(item["prices"]))

    const [page, setPage] = useState(0)
    const [option, setOption] = useState({})
    const [price, setPrice] = useState(basePrice)

    const [mode, setMode] = useState(0)

    // const [key, setKey] = useState(false); // Add a key state



    useEffect(() => {
        const nextPrices = {};
        const nextPictures = {};
        let nextPictureKeys = [];
        const nextOption = {};

        for (const field of Object.keys(item)) {
            if (field === "color" || field === "static_img" || field === "prices") continue;

            const fieldValue = item[field];
            if (typeof fieldValue !== "object" || fieldValue == null || Array.isArray(fieldValue)) continue;

            const optionRows = Object.keys(fieldValue).map((optionKey) => ({ [optionKey]: fieldValue[optionKey] }));
            if (optionRows.length === 0) continue;

            nextPrices[field] = optionRows;
            nextOption[field] = Object.keys(optionRows[0])[0];

            optionRows.forEach((entry) => {
                const optionKey = Object.keys(entry)[0];
                const optionValue = entry[optionKey];
                const optionImages = optionValue && optionValue["img"];
                if (Array.isArray(optionImages) && optionImages.length > 0) {
                    nextPictures[optionKey] = optionImages;
                    if (!nextPictureKeys.includes(optionKey)) {
                        nextPictureKeys.push(optionKey);
                    }
                }
            });
        }

        let nextMode = 0;
        if (item["static_img"] != null) nextMode = 1;

        if (item["color"] != null && typeof item["color"] === "object") {
            const colorKeys = Object.keys(item["color"]);
            if (colorKeys.length > 0) {
                if (colorKeys[0] === "Варьируется") {
                    nextPictureKeys = Array.isArray(item["color"]["Варьируется"]) ? item["color"]["Варьируется"] : [];
                    nextMode = 2;
                } else {
                    nextPictureKeys = colorKeys;
                    Object.keys(item["color"]).forEach((key) => {
                        nextPictures[key] = item["color"][key];
                    });
                }
            }
        }

        setPrices(nextPrices);
        setPictures(nextPictures);
        setPictureKeys(nextPictureKeys);
        setOption(nextOption);
        setMode(nextMode);
        setPage(0);
        setPrice(basePrice);
    }, [item, basePrice])

    // console.log(prices, option)
    
    
    // console.log(prices["storage"])

    function handleOption(where, key){
        const selectedKey = Object.keys(key)[0];
        var newOption = { ...option }
        newOption[where] = selectedKey
        setOption(newOption);
        var newPrice = basePrice
        if (item["color"] == null)
        for (let i=0; i < Object.keys(newOption).length; i++){
            if (item[Object.keys(newOption)[i]] && item[Object.keys(newOption)[i]][newOption[Object.keys(newOption)[i]]] && Object.keys(item[Object.keys(newOption)[i]][newOption[Object.keys(newOption)[i]]]["img"] || {}).length > 0){
                setPage(picture_keys.indexOf(selectedKey) == -1 ? page : picture_keys.indexOf(selectedKey))
            }
        }
        else{
            for (let i=0; i < Object.keys(newOption).length; i++){
                if (item[Object.keys(newOption)[i]] && item[Object.keys(newOption)[i]][newOption[Object.keys(newOption)[i]]] && Object.keys(item[Object.keys(newOption)[i]][newOption[Object.keys(newOption)[i]]]["img"] || {}).length > 0 && Object.keys(item["color"])[0] != 'Варьируется'){
                    setPage(picture_keys.indexOf(selectedKey))
                }
            }
        }
        // console.log(Object.keys(item["prices"])[0].slice(1, -1).replace(/'/g, "").split(', '))
        if (item["prices"] !== null)
        for (let i=0; i<Object.keys(item["prices"]).length; i++){
            var flag = true;
            for (let j=0; j<Object.values(newOption).length; j++){
                if (!Object.keys(item["prices"])[i].slice(1, -1).replace(/'/g, "").split(', ').includes(Object.values(newOption)[j])){
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
        if (mode === 0) var image = pictures[picture_keys[page]] && pictures[picture_keys[page]][0];
        if (mode === 1) var image = Array.isArray(item["static_img"]) ? item["static_img"][0] : undefined;
        if (mode === 2) {
            const selectedColor = Object.values(option).find(value => Object.keys(pictures).includes(value));
            var image = selectedColor && pictures[selectedColor] && pictures[selectedColor][picture_keys[page]] && pictures[selectedColor][picture_keys[page]][0];
        }
        if (!image) image = getFirstImage();
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

    const selectedPictureGroupKey = Object.values(option).find((value) => Object.keys(pictures).includes(value));
    const mode2Pictures = selectedPictureGroupKey && pictures[selectedPictureGroupKey] ? pictures[selectedPictureGroupKey][picture_keys[page]] : null;

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
            ( mode2Pictures &&
                <Slider {...settings} className="item-picture">
                    {mode2Pictures.map((pic) => {
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