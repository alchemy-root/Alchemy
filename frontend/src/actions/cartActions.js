import axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, LIKE_ADD_ITEM, LIKE_REMOVE_ITEM} from '../constants/cartConstants'

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            actualPrice: data.actualPrice,
            countInStock: data.countInStock,
            isDress: data.isDress,
            qty,
            size
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromLike = (id) => async (dispatch, getState) => {
    dispatch({
        type: LIKE_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('likeItems', JSON.stringify(getState().like.likeItems))
}

export const addToLike = (id) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: LIKE_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            actualPrice: data.actualPrice,
            countInStock: data.countInStock,
        }
    })
    localStorage.setItem('likeItems', JSON.stringify(getState().like.likeItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
