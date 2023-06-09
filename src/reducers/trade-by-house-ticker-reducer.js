import * as c from '../actions/ActionTypes';

const tradeByHouseTickerReducer = (state, action) => {
    switch (action.type) {
        case c.GET_TRADE_BY_HOUSE_TICKER_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                tradeByHouseTicker: action.tradeByHouseTicker
            };
        case c.GET_TRADE_BY_HOUSE_TICKER_FAILURE:
            return {
                ...state,
                isLoaded: true,
                error: action.error
            };
        default:
            throw new Error(`There is no action matching ${action.type}.`);
    }
};

export default tradeByHouseTickerReducer;