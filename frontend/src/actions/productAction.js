import {PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST,
     PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
     PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_BY_CATEGORY_REQUEST, PRODUCT_BY_CATEGORY_SUCCESS, PRODUCT_BY_CATEGORY_FAIL, PRODUCT_BY_BRAND_REQUEST, PRODUCT_BY_BRAND_SUCCESS, PRODUCT_BY_BRAND_FAIL, PRODUCT_BY_DEAL_REQUEST, PRODUCT_BY_DEAL_SUCCESS, PRODUCT_BY_DEAL_FAIL, PRODUCT_BY_GROUP_REQUEST, PRODUCT_BY_GROUP_SUCCESS, PRODUCT_BY_GROUP_FAIL} from '../constants/productConstants'
import axios from 'axios'
import { logout } from './userActions'

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const listProductDetail = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axios.post(`/api/products`, {} , config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}

export const listTopProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST,
        })

        const { data } = await axios.get(`/api/products/top`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: message,
        })
    }
}

export const productsFromCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_BY_CATEGORY_REQUEST,
        })
        const {data} = await axios.get(`/api/products/categorie/${category}`)
        dispatch({
            type: PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_BY_CATEGORY_FAIL,
            payload: message,
        })
    }
}

export const productsFromBrand = (category, brand) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_BY_BRAND_REQUEST,
        })
        const {data} = await axios.get(`/api/products/categorie/${category}/brandd/${brand}`)
        dispatch({
            type: PRODUCT_BY_BRAND_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_BY_BRAND_FAIL,
            payload: message,
        })
    }
}

export const listDealProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_BY_DEAL_REQUEST,
        })

        const { data } = await axios.get(`/api/products/dealsForToday`)

        dispatch({
            type: PRODUCT_BY_DEAL_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({
            type: PRODUCT_BY_DEAL_FAIL,
            payload: message,
        })
    }
}

export const productsFromGroup = (group) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_BY_GROUP_REQUEST,
        })
        const {data} = await axios.get(`/api/products/shopbie/${group}`)
        dispatch({
            type: PRODUCT_BY_GROUP_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_BY_GROUP_FAIL,
            payload: message,
        })
    }
}

