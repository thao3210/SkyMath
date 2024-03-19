import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const script = document.createElement('script');
script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
script.async = true;
script.defer = true;
script.crossOrigin = 'anonymous';
document.body.appendChild(script);
