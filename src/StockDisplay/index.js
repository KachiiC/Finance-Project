import React, { useState, useEffect} from 'react';
import {useForm} from "react-hook-form"
import './stockData'

function StockDisplay() {

  const {register, handleSubmit} = useForm();
  const [code, setCode] = useState("")
  const [stock, setStock] = useState({
    "Global Quote":{
      "01. symbol": "",
      "02. open": 0,
      "03. high": 0,
      "04. low": 0,
      "05. price": 0,
      "08. previous close": 0,
      "09. change": 0,
      "10. change percent": 0
    }
  })
  
  const onSubmit = data => {
    const submittedCode = document.getElementById("myInput").value
    console.log("Submitted "+ submittedCode)
    setCode(submittedCode)
  }

  useEffect(() => {
    if (code != "") {
      console.log("Fetching!")
      fetch(`https://alpha-vantage.p.rapidapi.com/query?symbol=${code}&function=GLOBAL_QUOTE`, {
        "method": "GET", 
        "headers": { "x-rapidapi-host": "alpha-vantage.p.rapidapi.com", 
                    "x-rapidapi-key": "985371e109mshb5666c0424d5dcfp1b7485jsndf2afe5a3591"
        }
      })
      .then((response) => { 
        return response.json() 
      })
      .then((stockApi) => {
        console.log("Fetching success!")
        setStock(stockApi)
        console.log(stock)
      })
      .catch(err => {
        console.log("Fetching failed.")
        console.log(err);
      });
    }
}, [code])

  const stockPrice = parseInt(stock["Global Quote"]["05. price"]).toFixed(2)
  const stockSymbol = stock["Global Quote"]["01. symbol"]

  return (
    <div>
      <h2>Live Stock Price</h2>
      <br></br>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="myInput" 
          name="stockCode" 
          ref={register} 
          placeholder="Stock Code" 
        />
      </form>
      <h1>{stockSymbol}</h1>
      <h6>{stockPrice}</h6>
    </div>
  );
}

export default StockDisplay