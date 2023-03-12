import React from 'react';
import { useState } from "react";
import Papa from "papaparse";
import { Input, Button } from '@mui/material';
import DataTable from '../Tables/DataTable';
import FetchPost from './FetchPost';


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
    const data = new FormData();
    data.append('file', files);
    data.append('filename', "test");
    fetch('upload', {
      method: 'POST',
      body: data,
    })


    // .then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `${body.file}` });
    //   });
    // });

    // FetchPost("/upload", JSON.stringify(files)).then((data) => {
    //     console.log(data); // JSON data parsed by `data.json()` call
    //   });

    // const formData = new FormData();
    // formData.append("file", files);
    // formData.append('filename', this.fileName.value);
    // console.log(formData)
    // fetch(
    //   "/upload", {
    //   method: "POST",
    //   body: formData
    // }
    // )

    
  };

  const data = new FormData();
  data.append('file', files);
  data.append('filename', "test");
  fetch('upload', {
    method: 'POST',
    body: data,
  })
  return (
    <div>
      <Input
        type="file"
        name="file"
        // ref={(ref) => { this.uploadInput = ref; }}
        onChange={changeHandler}
        inputProps={{ accept: '.csv' }}
        style={{ display: "block" }}
        sx={{ width: '12.5%', overflow: 'hidden', padding: 2 }}

      />
      {/* <input ref={(ref) => { this.uploadInput = ref; }} onChange={changeHandler} type="file" /> */}
      <DataTable parsedData={parsedData} tableRows={tableRows} values={values} />
    </div>
  );
}


