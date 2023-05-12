import React from 'react';

function TradeDetail({ trade, className }) {
  return (
    <div className={`absolute bg-slate-500 p-4 shadow-md ${className}`}>
      <h2>Trade Details:</h2>
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
}

export default TradeDetail;