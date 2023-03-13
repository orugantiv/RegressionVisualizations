import React from 'react';
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Input, Button } from '@mui/material';
import DataTable from './DataTable';
import Plot from 'react-plotly.js';
import Upload from './Upload';
import PlotDataSet from './Plots/PlotDataSet';


// const Stats = require("statsmodels-js");

export default function Summary() {
  // State to store parsed data
  // const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  // const [files, setFiles] = useState([]);
  const changeHandler = (event) => {
    event.preventDefault();
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
        // setFiles(event.target.files[0])

      },
    });
  };

  return (
    <div>
      <Upload handleFileDrop={changeHandler} />
      <DataTable tableRows={tableRows} values={values} />
      <PlotDataSet items={values}/>
    </div>


  );
}


