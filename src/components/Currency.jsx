import React, { useState, useEffect } from "react";
import axios from "axios";

function Currency() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('BGN');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencies, setCurrencies] = useState([]);
    const [isReversed, setIsReversed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    
    const API_KEY = 'eb0a060898499b609c648fc1';

    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
            .then(response => {
                setCurrencies(Object.keys(response.data.conversion_rates));
                setExchangeRate(response.data.conversion_rates[toCurrency]);
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    }, [fromCurrency, toCurrency]);

    const convertAmount = (amount * exchangeRate).toFixed(4);

    const getFlagUrl = (currencyCode) => {
        return `https://flagcdn.com/48x36/${currencyCode.slice(0, 2).toLowerCase()}.png`;
    };

    const handleReverse = () => {
        const tempCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempCurrency);
        setIsReversed(!isReversed);
    };

    return (
        <div className="container">
            <h2>Валутен Калкулатор</h2>
            <div className="wrapper">
                <form>
                    <div className="calculator-date">
                        <label htmlFor="datePickerCalculator">Валутен курс за:</label>
                        <input 
                            id="datePickerCalculator" 
                            type="date" 
                            name="date[date_published]" 
                            value={selectedDate} 
                            onChange={(e) => setSelectedDate(e.target.value)} 
                        />
                    </div>
                    <div className="amount">
                        <label>Количество:</label>
                        <input 
                            id="qtty"
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(Number(e.target.value))} 
                        />
                    </div>
                    <div className="convert_box">
                        <div className="From">
                            <p>От Валута:</p>
                            <div className="select_input">
                                <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} />
                                <select 
                                    value={fromCurrency} 
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                >
                                    {currencies.map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="reverse" onClick={handleReverse}>
                            <i className="fas fa-exchange-alt"></i>
                        </div>
                        <div className="To">
                            <p>Към Валута:</p>
                            <div className="select_input">
                                <img src={getFlagUrl(toCurrency)} alt={toCurrency} />
                                <select 
                                    value={toCurrency} 
                                    onChange={(e) => setToCurrency(e.target.value)}
                                >
                                    {currencies.map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="result">
                        <p>Крайна сума:</p>
                        <p>{amount} {fromCurrency} = {convertAmount} {toCurrency}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Currency;
