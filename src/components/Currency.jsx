import React, { useState, useEffect } from "react";
import axios from "axios";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import CurrencySelector from "./CurrencySelector";
import ReverseButton from "./ReverseButton";
import ConversionResult from "./ConversionResult";

const API_KEY = 'eb0a060898499b609c648fc1';

function Currency() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('BGN');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencies, setCurrencies] = useState([]);
    const [isReversed, setIsReversed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
            .then(response => {
                setCurrencies(Object.keys(response.data.conversion_rates));
                setExchangeRate(response.data.conversion_rates[toCurrency]);
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    }, [fromCurrency, toCurrency]);

    const convertAmount = (amount * exchangeRate).toFixed(4);

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
                    <DateInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <AmountInput amount={amount} setAmount={setAmount} />
                    <div className="convert_box">
                        <CurrencySelector 
                            label="От Валута:" 
                            currency={fromCurrency} 
                            setCurrency={setFromCurrency} 
                            currencies={currencies} 
                        />
                        <ReverseButton handleReverse={handleReverse} />
                        <CurrencySelector 
                            label="Към Валута:" 
                            currency={toCurrency} 
                            setCurrency={setToCurrency} 
                            currencies={currencies} 
                        />
                    </div>
                    <ConversionResult 
                        amount={amount} 
                        fromCurrency={fromCurrency} 
                        toCurrency={toCurrency} 
                        convertAmount={convertAmount} 
                    />
                </form>
            </div>
        </div>
    );
}
export default Currency;