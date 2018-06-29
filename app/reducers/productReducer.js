import {
    FETCHING_PRODUCT_DATA,
    FETCHING_PRODUCT_DATA_SUCCESS,
    FETCHING_PRODUCT_DATA_FAILED,
    FETCHING_ADDED_PRODUCT_SUCCESS,
    FETCHING_ADDED_PRODUCT_FAILED
 } from '../constants'

const initialState = {
    products: [],
    addedProducts: [],
    error: false
}

export default function productReducer (state = initialState, action) {

    switch (action.type) {
        case FETCHING_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                products: action.products,
                error: false
            }
        case FETCHING_PRODUCT_DATA_FAILED:
            return state.merge ({
                error: action && action.error ? action.error : true
            })
        case FETCHING_ADDED_PRODUCT_SUCCESS:
            return {
                ...state,
                addedProducts: action.addedProducts,
                error: false
            }
        case FETCHING_ADDED_PRODUCT_FAILED:
            return state.merge({
                error: action && action.error ? action.error : true
            })
        default:
            return state
    }
}
