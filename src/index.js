import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  HashRouter,
  RouterProvider,
  
} from "react-router-dom";
import Warranty from './Warranty';
import Delivery from './Delivery';
import Loyalty from './Loyalty';
import Contacts from './Contacts';
import Shop from './Shop';
import ShopItem from './ShopItem';
import Accessories from './Acessories';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//   },
//   {
//     path: '/warranty',
//     element: <Warranty/>
//   },
//   {
//     path: '/delivery',
//     element: <Delivery/>
//   },
//   {
//     path: '/wallet',
//     element: <Loyalty/>
//   },
//   {
//     path: '/contacts',
//     element: <Contacts/>
//   },
//   {
//     path: '/shop',
//     element: <Shop/>
//   },
//   {
//     path: '/shop/accessories',
//     element: <Accessories/>
//   },
//   {
//     path: '/shop/:item',
//     element: <ShopItem/>
//   },
//   {
//     path: '/shop/accessories/:item',
//     element: <ShopItem/>
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename=''>
      <App/>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
