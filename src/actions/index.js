import * as c from './ActionTypes';

export const getRecentTradesSuccess = (recentTrades) => ({
  type: c.GET_RECENT_TRADES_SUCCESS,
  recentTrades
});

export const getRecentTradesFailure = (error) => ({
  type: c.GET_RECENT_TRADES_FAILURE,
  error
});

export const getTradeByTickerSuccess = (tradeByTicker) => ({
    type: c.GET_TRADE_BY_TICKER_SUCCESS,
    tradeByTicker
  });
  
  export const getTradeByTickerFailure = (error) => ({
    type: c.GET_TRADE_BY_TICKER_FAILURE,
    error
  });