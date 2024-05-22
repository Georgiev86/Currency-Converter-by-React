import React from 'react';

function CurrencySelector({ label, currency, setCurrency, currencies }) {
    const getFlagUrl = (currencyCode) => {
        return `https://flagcdn.com/48x36/${currencyCode.slice(0, 2).toLowerCase()}.png`;
    };

    return (
        <div className="From">
            <p>{label}</p>
            <div className="select_input">
                <img src={getFlagUrl(currency)} alt={currency} />
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CurrencySelector;
