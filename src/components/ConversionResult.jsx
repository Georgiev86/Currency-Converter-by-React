import React from 'react';

function ConversionResult({ amount, fromCurrency, toCurrency, convertAmount }) {
    return (
        <div className="result">
            <p>Крайна сума:</p>
            <p>{amount} {fromCurrency} = {convertAmount} {toCurrency}</p>
        </div>
    );
}

export default ConversionResult;
