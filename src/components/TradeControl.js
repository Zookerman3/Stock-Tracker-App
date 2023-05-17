import React, { useEffect, useReducer, useState } from 'react';
import recentTradesReducer from '../reducers/recent-trades-reducer';
import { getRecentTradesSuccess, getRecentTradesFailure } from '../actions/index';
import TradeDetail from './TradeDetail';

const initialState = {
    isLoaded: false,
    recentTrades: [],
    error: null,
};

function TradeControl() {
    const [state, dispatch] = useReducer(recentTradesReducer, initialState);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [tradeDetailsVisible, setTradeDetailsVisible] = useState(false);

    useEffect(() => {
        const headers = {
            'Accept': 'application/json',
            'X-CSRFToken': 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
            'Authorization': 'Token 5451c2b730af150677e5afd547ba70fe626a5d8c',
        };

        fetch('/api/live/congresstrading', { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then(jsonifiedResponse => {
                const action = getRecentTradesSuccess(jsonifiedResponse);
                dispatch(action);
            })
            .catch(error => {
                const action = getRecentTradesFailure(error.message);
                dispatch(action);
            });
    }, []);

    const handleTradeClick = (trade) => {
        setSelectedTrade(trade);
        setTradeDetailsVisible(!tradeDetailsVisible);
    };

    const { error, isLoaded, recentTrades } = state;

    if (error) {
        return <h1 className='mt-20'>Error: {error}</h1>;
    } else if (!isLoaded) {
        return <h1 className='mt-20'>...Loading...</h1>;
    } else {
        const firstTenTrades = recentTrades.slice(0, 20);
        return (
            <div className='mt-20 bg-slate-800 text-slate-200'>
                
                <h1 className='pt-5 pb-5'>Most Recent Trades</h1>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs uppercase bg-slate-700  text-slate-300'>
                        <tr>
                            <th className='px-6 py-3'>Representative</th>
                            <th className='px-6 py-3'>House</th>
                            <th className='px-6 py-3'>Transaction</th>
                            <th className='px-6 py-3'>Ticker</th>
                            <th className='px-6 py-3'>Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firstTenTrades.map((trade, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    onClick={() => handleTradeClick(trade)}
                                    className='bg-slate-800 border-b dark:border-gray-700 text-slate-200'
                                >
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-slate-200'>
                                        {trade.Representative}
                                    </td>
                                    <td className='px-6 py-4'>{trade.House}</td>
                                    <td className='px-6 py-4'>{trade.Transaction}</td>
                                    <td className='px-6 py-4'>{trade.Ticker}</td>
                                    <td className='px-6 py-4'>{trade.Range}</td>
                                </tr>
                                {tradeDetailsVisible && selectedTrade === trade && (
                                    <tr>
                                        <td colSpan={5}>
                                            <TradeDetail trade={selectedTrade} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}

export default TradeControl;