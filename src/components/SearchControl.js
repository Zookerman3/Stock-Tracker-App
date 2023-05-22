import React, { useReducer, useState } from 'react';
import tradeByHouseTickerReducer from "../reducers/trade-by-house-ticker-reducer"
import tradeBySenateTickerReducer from '../reducers/trade-by-senate-ticker-reducer';
import { getTradeByHouseTickerSuccess, getTradeByHouseTickerFailure } from '../actions/index';
import { getTradeBySenateTickerSuccess, getTradeBySenateTickerFailure } from '../actions/index';
import { db, auth } from './../firebase.js';
import { collection, addDoc } from "firebase/firestore";

const initialState = {
    isLoaded: false,
    tradeByTicker: [],
    error: null,
};

function SearchControl() {
    const [state, dispatch] = useReducer(tradeByHouseTickerReducer, initialState);
    const [ticker, setTicker] = useState('');
    const [addedtoFBmessage, setAddedtoFBMessage] = useState('');
    const [stateSenate, dispatchSenate] = useReducer(tradeBySenateTickerReducer, initialState);

    // const url = `/api/historical/housetrading/${ticker}`;

    function fetchTrades() {
        const headers = {
            'Accept': 'application/json',
            'X-CSRFToken': 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
            'Authorization': `Token ${process.env.REACT_APP_API_KEY}`,
        };

        Promise.all([
            fetch(`/api/historical/housetrading/${ticker}`, { headers }),
            fetch(`/api/historical/senatetrading/${ticker}`, { headers })
        ])
            .then(([houseResponse, senateResponse]) => {
                if (!houseResponse.ok) {
                    throw new Error(`${houseResponse.status}: ${houseResponse.statusText}`);
                }
                if (!senateResponse.ok) {
                    throw new Error(`${senateResponse.status}: ${senateResponse.statusText}`);
                }
                return Promise.all([houseResponse.json(), senateResponse.json()]);
            })
            .then(([houseJsonifiedResponse, senateJsonifiedResponse]) => {
                const houseAction = getTradeByHouseTickerSuccess(houseJsonifiedResponse);
                const senateAction = getTradeBySenateTickerSuccess(senateJsonifiedResponse);
                dispatch(houseAction);
                dispatchSenate(senateAction);
            })
            .catch(error => {
                const houseAction = getTradeByHouseTickerFailure(error.message);
                const senateAction = getTradeBySenateTickerFailure(error.message);
                dispatch(houseAction);
                dispatchSenate(senateAction);
            });
    }

    const handleAddingTradeToDB = async (tradeData) => {
        console.log(tradeData);
        const userId = auth.currentUser.uid
        const tradeDataWithUser = { ...tradeData, userId }
        await addDoc(collection(db, "trades"), tradeDataWithUser);
    }

    const { error, isLoaded, tradeByHouseTicker } = state;
    const { tradeBySenateTicker } = stateSenate;

    if (!isLoaded) {
        return (
            <React.Fragment>
                <div className="mt-20 flex">
                    <input className=' ml-5 mt-5 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-slate'
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="Enter ticker"
                    />
                    <button className='mt-5 inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900' onClick={fetchTrades}>Search</button>
                </div>
            </React.Fragment>
        );
    } else if (error) {
        return <h1 className='mt-20'>Error: {error}</h1>;
    } else if (auth.currentUser == null) {

        return (
            <div className='mt-20 bg-slate-800 text-slate-200 overflow-hidden'>
                <div className='mt-5 mb-5'>
                    <h1 className='pt-5 pb-10 inline mr-5 '>Most Recent Trades</h1>
                    <h1 className='pt-5 pb-5 inline'>Please Log In to Save Trades</h1>
                </div>

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
                        {tradeByHouseTicker.map((trade, index) => (
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
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <br />
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
                        {tradeBySenateTicker.map((trade, index) => (
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
                                    <td className='px-6 py-4'><button onClick={() => {
                                        handleAddingTradeToDB(trade);
                                        setAddedtoFBMessage('Added Trade to Account');
                                    }}
                                        className='inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900'>Add</button></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        )


    } else {
        return (

            <div className='mt-20 bg-slate-800 text-slate-200 overflow-hidden'>
                <div className='mt-5 mb-5'>
                    <h1 className='pt-5 pb-10 inline mr-5 '>Most Recent Trades</h1>
                    <h1 className='pt-5 pb-5 inline'>{addedtoFBmessage}</h1>
                </div>
                <div className='flex mt-4'>
                    <div className='w-1/2 pr-4 flex-shrink-0'>
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
                                {tradeByHouseTicker.map((trade, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className='bg-slate-800 border-b dark:border-gray-700 text-slate-200'
                                        >
                                            <td className='px-6 py-4 font-medium whitespace-nowrap text-slate-200'>
                                                {trade.Representative}
                                            </td>
                                            <td className='px-6 py-'>{trade.Date}</td>
                                            <td className='px-6 py-4'>{trade.Ticker}</td>
                                            <td className='px-6 py-4'>{trade.Transaction}</td>
                                            <td className='px-6 py-4'>{trade.Amount}</td>
                                            <td className='px-6 py-4'>{trade.Range}</td>
                                            <td className='px-6 py-4'><button onClick={() => {
                                                handleAddingTradeToDB(trade);
                                                setAddedtoFBMessage('Added Trade to Account');
                                            }}
                                                className='inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900'>Add</button></td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-1/2 pl-4 overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs uppercase bg-slate-700 text-slate-300'>
                                <tr>
                                    <th className='px-6 py-3'>Senator</th>
                                    <th className='px-6 py-3'>Date</th>
                                    <th className='px-6 py-3'>Ticker</th>
                                    <th className='px-6 py-3'>Transaction</th>
                                    <th className='px-6 py-3'>Amount</th>
                                    <th className='px-6 py-3'>Range</th>
                                    <th className='px-6 py-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tradeBySenateTicker.map((trade, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className='bg-slate-800 border-b dark:border-gray-700 text-slate-200'
                                        >
                                            <td className='px-6 py-4 font-medium whitespace-nowrap text-slate-200'>
                                                {trade.Senator}
                                            </td>
                                            <td className='px-6 py-4'>{trade.Date}</td>
                                            <td className='px-6 py-4'>{trade.Ticker}</td>
                                            <td className='px-6 py-4'>{trade.Transaction}</td>
                                            <td className='px-6 py-4'>{trade.Amount}</td>
                                            <td className='px-6 py-4'>{trade.Range}</td>
                                            <td className='px-6 py-4'><button onClick={() => {
                                                handleAddingTradeToDB(trade);
                                                setAddedtoFBMessage('Added Trade to Account');
                                            }}
                                                className='inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900'>Add</button></td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <br />


            </div>
        )
    }
}


export default SearchControl;