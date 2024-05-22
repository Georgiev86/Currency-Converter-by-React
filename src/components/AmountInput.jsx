import React from 'react';

function AmountInput({ amount, setAmount }) {
    return (
        <div className="amount">
            <label>Количество:</label>
            <input 
                id="qtty"
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
            />
        </div>
    );
}

export default AmountInput;
