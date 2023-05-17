import React, { useReducer, useState } from 'react';
import tradeByTickerReducer from '../reducers/trade-by-ticker-reducer';
import { getTradeByTickerSuccess, getTradeByTickerFailure } from '../actions/index';

const initialState = {
    isLoaded: false,
    tradeByTicker: [],
    error: null,
};

function SearchControl() {
    const [state, dispatch] = useReducer(tradeByTickerReducer, initialState);
    const [ticker, setTicker] = useState('');

    function fetchTrades() {
        const headers = {
            'Accept': 'application/json',
            'X-CSRFToken': 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
            'Authorization': 'Token 5451c2b730af150677e5afd547ba70fe626a5d8c',
        };

        // const url = `/api/historical/housetrading/${ticker}`;

        fetch(`/api/historical/housetrading/${ticker}`, { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then(jsonifiedResponse => {
                const action = getTradeByTickerSuccess(jsonifiedResponse);
                dispatch(action);
            })
            .catch(error => {
                const action = getTradeByTickerFailure(error.message);
                dispatch(action);
            });
    }

    const { error, isLoaded, tradeByTicker } = state;

    if (!isLoaded) {
        return (
            <React.Fragment>
                <div className="mt-20">
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="Enter ticker"
                    />
                    <button onClick={fetchTrades}>Search</button>
                </div>
            </React.Fragment>
        );
    } else if (error) {
        return <h1 className='mt-20'>Error: {error}</h1>;
    } else {
        console.log(tradeByTicker)
        return (
            <div>
                {tradeByTicker.map((trade, index) => (
                    <div key={index}>
                        <p>Date: {trade.Date}</p>
                        <p>Ticker: {trade.Ticker}</p>
                        <p>Representative: {trade.Representative}</p>
                        <p>Transaction: {trade.Transaction}</p>
                        <p>Amount: {trade.Amount}</p>
                        <p>Range: {trade.Range}</p>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}


export default SearchControl;