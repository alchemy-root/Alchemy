import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer } from './reducers/productReducers'
import {cartReducer, likeReducer} from './reducers/cartReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers';
import { createSlideReducer, deleteSlideReducer, getSlidesReducer } from './reducers/slideReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    like: likeReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    getSlides: getSlidesReducer,
    createSlide: createSlideReducer,
    deleteSlide: deleteSlideReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAdressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const likeItemsFromStorage = localStorage.getItem('likeItems') 
? JSON.parse(localStorage.getItem('likeItems'))
: []


const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAdressFromStorage },
    like: { likeItems: likeItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const Store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default Store
