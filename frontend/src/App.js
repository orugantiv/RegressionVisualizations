import React from 'react';
// import { useState, useRef } from "react";
import "./App.css";
// import csv from 'csv-parse';
import { useState, useRef, useEffect } from "react";
import Summary from './Pages/Summary/Summary';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Summary />}/>
    </Routes>
    </BrowserRouter >
  );

};


