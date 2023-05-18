import * as c from '../actions/ActionTypes';

const tradeBySenateTickerReducer = (state, action) => {
    switch (action.type) {
        case c.GET_TRADE_BY_SENATE_TICKER_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                tradeBySenateTicker: action.tradeBySenateTicker
            };
        case c.GET_TRADE_BY_SENATE_TICKER_FAILURE:
            return {
                ...state,
                isLoaded: true,
                error: action.error
            };
        default:
            throw new Error(`There is no action matching ${action.type}.`);
    }
};

export default tradeBySenateTickerReducer;