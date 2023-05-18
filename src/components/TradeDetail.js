import React from 'react';
import { auth } from './../firebase.js';

function TradeDetail({ trade, className, onAddingTradeToFB }) {

    if (auth.currentUser == null) {
         return (
    <div className={`absolute bg-slate-500 p-4 shadow-md text-black ${className}`}>
      <h2 className='font-bold'>Trade Details:</h2>
      <p><strong>Report Date:</strong> {trade.ReportDate}</p>
      <p><strong>Transaction Date:</strong> {trade.TransactionDate}</p>
      <p><strong>Ticker:</strong> {trade.Ticker}</p>
      <p><strong>Representative:</strong> {trade.Representative}</p>
      <p><strong>Transaction:</strong> {trade.Transaction}</p>
      <p><strong>Amount:</strong> {trade.Amount}</p>
      <p><strong>House:</strong> {trade.House}</p>
      <p><strong>Range:</strong> {trade.Range}</p>
    </div>
  );
    } else {
        return (
            <div className={`absolute bg-slate-500 p-4 shadow-md text-black ${className}`}>
              <h2 className='font-bold'>Trade Details:</h2>
              <p><strong>Report Date:</strong> {trade.ReportDate}</p>
              <p><strong>Transaction Date:</strong> {trade.TransactionDate}</p>
              <p><strong>Ticker:</strong> {trade.Ticker}</p>
              <p><strong>Representative:</strong> {trade.Representative}</p>
              <p><strong>Transaction:</strong> {trade.Transaction}</p>
              <p><strong>Amount:</strong> {trade.Amount}</p>
              <p><strong>House:</strong> {trade.House}</p>
              <p><strong>Range:</strong> {trade.Range}</p>
              <br></br>
              <button className='inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-white hover:text-gray-900 active:bg-gray-900' onClick={() => onAddingTradeToFB(trade)}>Add</button>
            </div>
          );
    }

 
}

export default TradeDetail;