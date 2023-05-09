import * as c from './ActionTypes';

export const getRecentTradesSuccess = (recentTrades) => ({
  type: c.GET_RECENT_TRADES_SUCCESS,
  recentTrades
});

export const getRecentTradesFailure = (error) => ({
  type: c.GET_RECENT_TRADES_FAILURE,
  error
});