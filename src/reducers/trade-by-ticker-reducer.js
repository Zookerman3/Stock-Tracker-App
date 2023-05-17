import * as c from '../actions/ActionTypes';

const tradeByTickerReducer = (state, action) => {
    switch (action.type) {
        case c.GET_TRADE_BY_TICKER_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                tradeByTicker: action.tradeByTicker
            };
        case c.GET_TRADE_BY_TICKER_FAILURE:
            return {
                ...state,
                isLoaded: true,
                error: action.error
            };
        default:
            throw new Error(`There is no action matching ${action.type}.`);
    }
};

export default tradeByTickerReducer;