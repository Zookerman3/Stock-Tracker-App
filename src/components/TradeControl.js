import React, { useEffect, useReducer, useState } from 'react';
import recentTradesReducer from '../reducers/recent-trades-reducer';
import { getRecentTradesSuccess, getRecentTradesFailure } from "../actions/index";
import TradeDetail from './TradeDetail';


const initialState = {
    isLoaded: false,
    recentTrades: [],
    error: null,
};

function TradeControl() {
    const [state, dispatch] = useReducer(recentTradesReducer, initialState);
    const [selectedTradeId, setSelectedTradeId] = useState(null);

    useEffect(() => {
        const headers = {
            'Accept': 'application/json',
            'X-CSRFToken': 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
            'Authorization': 'Token 5451c2b730af150677e5afd547ba70fe626a5d8c',
        };

        // fetch('https://api.quiverquant.com/beta/live/congresstrading',  { headers })
        fetch('/api/live/congresstrading', { headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json()
                }
            })
            .then((jsonifiedResponse) => {
                const action = getRecentTradesSuccess(jsonifiedResponse)
                dispatch(action);
            })
            .catch((error) => {
                const action = getRecentTradesFailure(error.message)
                dispatch(action);
            });
    }, [])



    const { error, isLoaded, recentTrades } = state;

    const handleTradeClick = (tradeId) => {
        setSelectedTradeId(tradeId === selectedTradeId ? null : tradeId);
      };

    if (error) {
        return <h1 className='mt-20'>Error: {error}</h1>;
    } else if (!isLoaded) {
        return <h1 className='mt-20'>...Loading...</h1>;
    } else {
        const firstTenTrades = recentTrades.slice(0, 10);
        return (
            <React.Fragment>
                <div className='mt-20'>
                    <h1>Most Recent Trades</h1>
                    <ul>
                        {firstTenTrades.map((trade, index) =>
                            <li key={trade.Id} onClick={() => handleTradeClick(trade.Id)}>
                                <h3>{trade.Representative}</h3>
                                <p>{trade.House}</p>
                                <p>{trade.Transaction}</p>
                                <p>{trade.Ticker}</p>
                                <p>{trade.Range}</p>
                                <br></br>
                            </li>
                        )}
                    </ul>
                </div>

                {selectedTradeId && (
          <TradeDetail trade={recentTrades.find((trade) => trade.Id === selectedTradeId)} />
        )}
            </React.Fragment>
        );
    }


}


export default TradeControl;