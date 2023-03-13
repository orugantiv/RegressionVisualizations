export default async function FetchPost(url = "", data={} ) {


    // Default options are marked with *
    const formData = new FormData();

    Object.entries(data).forEach(([value, key]) => {
      formData.append(key, value);});

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: formData, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  /* 
  Example POST method implementation:

    postData("https://example.com/answer", { answer: 42 }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  
  */

  