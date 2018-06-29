// @flow
import { urls,
    FETCHING_PRODUCT_DATA_SUCCESS, FETCHING_PRODUCT_DATA_FAILED,
    SELECT_PRODUCT_SUCCESS, SELECT_PRODUCT_FAILED,
    FETCHING_ADDED_PRODUCT_SUCCESS, FETCHING_ADDED_PRODUCT_FAILED
    }
    from '../constants'
import { callAPI } from '../utils'

export function loadProducts() {
    return (dispatch) => {
        return callAPI(urls.FETCHING_PRODUCTS, 'POST', {})
        .then((data) => {
            let products = [];
            for (let property in data) {
                products.push(data[property])
            }
            dispatch({
                type: FETCHING_PRODUCT_DATA_SUCCESS,
                products: products
            })
        }, (error) => {
            dispatch({
                type: FETCHING_PRODUCT_DATA_FAILED,
                error: error
            })
        })
    }
}

export function addProduct(product) {
    let params = {
        device_id: 'abcgGtnHDJ6437SHBN',
        scanned_product_id: product.scanned_product_id,
        retailer_id: product.retailer_id,
        product_id: product.product_id
    }

    return (dispatch) => {
        return callAPI(urls.ADD_PRODUCTS, 'POST', params)
        .then((data) => {
            dispatch({
                type: SELECT_PRODUCT_SUCCESS
            })
        }, (error) => {
            dispatch({
                type: SELECT_PRODUCT_FAILED,
                error: error
            })
        })
    }
}

export function loadAddedProducts() {
    return (dispatch) => {
        return callAPI(urls.FETCHING_ADDED_PRODUCTS, 'POST', {})
        .then((data) => {
            dispatch({
                type: FETCHING_ADDED_PRODUCT_SUCCESS,
                addedProducts: data && data.lines ? data.lines : []
            })
        }, (error) => {
            dispatch({
                type: FETCHING_ADDED_PRODUCT_FAILED,
                error: error
            })
        })
    }
}
