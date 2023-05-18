import * as c from './ActionTypes';

export const getRecentTradesSuccess = (recentTrades) => ({
    type: c.GET_RECENT_TRADES_SUCCESS,
    recentTrades
});

export const getRecentTradesFailure = (error) => ({
    type: c.GET_RECENT_TRADES_FAILURE,
    error
});

export const getTradeByHouseTickerSuccess = (tradeByHouseTicker) => ({
    type: c.GET_TRADE_BY_HOUSE_TICKER_SUCCESS,
    tradeByHouseTicker
});

export const getTradeByHouseTickerFailure = (error) => ({
    type: c.GET_TRADE_BY_HOUSE_TICKER_FAILURE,
    error
});

export const getTradeBySenateTickerSuccess = (tradeBySenateTicker) => ({
    type: c.GET_TRADE_BY_SENATE_TICKER_SUCCESS,
    tradeBySenateTicker
});

export const getTradeBySenateTickerFailure = (error) => ({
    type: c.GET_TRADE_BY_SENATE_TICKER_FAILURE,
    error
});