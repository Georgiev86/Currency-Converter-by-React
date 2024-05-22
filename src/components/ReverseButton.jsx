import React from 'react';

function ReverseButton({ handleReverse }) {
    return (
        <div className="reverse" onClick={handleReverse}>
            <i className="fas fa-exchange-alt"></i>
        </div>
    );
}

export default ReverseButton;
