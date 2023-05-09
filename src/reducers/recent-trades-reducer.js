import * as c from '../actions/ActionTypes';

const recentTradesReducer = (state, action) => {
  switch (action.type) {
    case c.GET_RECENT_TRADES_SUCCESS:
      return {
        ...state, 
        isLoaded: true,
        recentTrades: action.recentTrades
      };
    case c.GET_RECENT_TRADES_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
    }
};

export default recentTradesReducer;
