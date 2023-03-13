import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {v4 as uuidv4} from 'uuid';

// import { Virtuoso } from 'react-virtuoso'

const root = ReactDOM.createRoot(document.getElementById('root'));
let myuuid = uuidv4();
localStorage.setItem("mysessionid", myuuid)

root.render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>
  
);


