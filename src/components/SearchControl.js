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

            <div className='mt-20 bg-slate-800 text-slate-200'>
                <h1 className='pt-5 pb-5'>Most Recent Trades</h1>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs uppercase bg-slate-700 text-slate-300'>
                        <tr>
                            <th className='px-6 py-3'>Representative</th>
                            <th className='px-6 py-3'>Date</th>
                            <th className='px-6 py-3'>Ticker</th>
                            <th className='px-6 py-3'>Transaction</th>
                            <th className='px-6 py-3'>Amount</th>
                            <th className='px-6 py-3'>Range</th>
                            <th className='px-6 py-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradeByTicker.map((trade, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className='bg-slate-800 border-b dark:border-gray-700 text-slate-200'
                                >
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-slate-200'>
                                        {trade.Representative}
                                    </td>
                                    <td className='px-6 py-4'>{trade.Date}</td>
                                    <td className='px-6 py-4'>{trade.Ticker}</td>
                                    <td className='px-6 py-4'>{trade.Transaction}</td>
                                    <td className='px-6 py-4'>{trade.Amount}</td>
                                    <td className='px-6 py-4'>{trade.Range}</td>
                                    <td className='px-6 py-4'><button className='inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900'>Add</button></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

export default SearchControl;