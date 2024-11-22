import {configureStore,combineReducers} from "@reduxjs/toolkit"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import LoginUser from "./reducers/LoginUserSlice"
import AdminSlice from "./reducers/AdminSlice"
import CartSlice from "./reducers/CartSlice"


const rootReducer = combineReducers({
    loggedInData:LoginUser,
    AdminSlice:AdminSlice,
    CartSlice:CartSlice
})

const persistConfig = {
    key:"root",
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer:persistedReducer
})

const persistor = persistStore(store)
export {store,persistor}