import React from 'react';
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Input, Button } from '@mui/material';
import DataTable from '../Pages/Summary/DataTable';
import Plot from 'react-plotly.js';


export default function ImportExport() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [files, setFiles] = useState([]);


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

        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
        setFiles(event.target.files[0])

      },
    });
  };

  console.log('RowArray', tableRows);
  console.log('ValuesArray', values);

  const updateDatasetHandler = () => {
    console.log("gello");
    fetch('/currentSessionKey', {
      method: 'GET',
    }).then((response) => {
      console.log(response.json())
    });

  }

  // useEffect(() => {
  //   const data = new FormData();
  //   data.append('file', files);
  //   data.append('filename', localStorage.getItem('mysessionid'));
  //   fetch('/upload_data', {
  //     method: 'POST',
  //     body: data,
  //   }).then((response) => {
  //     console.log(response.json())
  //   });
  // });


  return (
    <div>
      <Input
        type="file"
        name="file"
        onChange={changeHandler}
        inputProps={{ accept: '.csv' }}
        style={{ display: "block" }}
        sx={{ width: '12.5%', overflow: 'hidden', padding: 2 }}
      />
      <DataTable parsedData={parsedData} tableRows={tableRows} values={values} />


    </div>
  );
}


