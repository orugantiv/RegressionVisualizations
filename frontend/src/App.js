import React from 'react';
// import { useState, useRef } from "react";
import "./App.css";
// import csv from 'csv-parse';
import ImportExport from './Import_Export/ImportExport';
import DataTable from './Tables/DataTable';
import { useState, useRef, useEffect } from "react";


function updateData() {

} 
export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('parsedData'));
    if (item) {
     setItems(items);
     console.log(items);
    }

  }, [localStorage.getItem('parsedData')]);


  return (
    <div>
    <ImportExport />
    {/* <DataTable items={items}/> */}


    </div>
  );

};


