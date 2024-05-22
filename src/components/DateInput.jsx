import React from 'react';

function DateInput({ selectedDate, setSelectedDate }) {
    return (
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
    );
}

export default DateInput;
