import React, { useCallback, useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import configData from "../config.json"

const token = configData.ACCESS_TOKEN;
const BASE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${token}`

function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [exchangeRate, setExchangeRate] = useState(null)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    setError(null);
    fetchCurrencies()
  }, [])
  const fetchCurrencies = async () => {
    await fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            if(data.error) {
               return setError(data.error)
            }
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
        })
        .catch(e => console.log(e))
  }
const fetchExchangeRate = useCallback(async () => {
    setError(null);
    setLoading(true);
    setExchangeRate(null)
    if (fromCurrency && toCurrency && amount) {
     await fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            if(data.error) {
                return setError(data.error)
             }
            data.rates && setExchangeRate(data.rates[toCurrency])
        })
        .catch(e =>{ console.log(e); setLoading(false)})
    }
}, [fromCurrency, toCurrency, amount])

useEffect(() => {
    fetchExchangeRate()
}, [fetchExchangeRate])


const swapCurrencies = () => {
    if(toCurrency && fromCurrency) {
        setToCurrency(fromCurrency)
        setFromCurrency(toCurrency)
    }
}

  return (
      <form>
        <div>
            <label>Amount:</label>
            <div>
                <input 
                    name="amount"
                    className="input"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                /> 
            </div>
        </div>
        <br />
        <CustomSelect 
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
            title="From Currency:"
            options={currencyOptions}
          />
        <br />
        <div>
            <button type="button" onClick={swapCurrencies}>
                Swap &#x021C5;
            </button>  
        </div>
        <br />
        <CustomSelect 
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
            title="To Currency:"
            options={currencyOptions}
          />
          <br />
          <div className="result">
            {amount && amount !== 0 && error === null ? 
            <h2>
               {loading ? "Loading..." : <>{`${amount}${fromCurrency} = ${exchangeRate * amount}${toCurrency}`}</>}
            </h2> : 
            <h5>Result will appear here</h5>}
          </div>
          <br />
          {
            error?.message && <p className="error">{error.message}</p>
          }
      </form>
  );
}

export default Converter;
