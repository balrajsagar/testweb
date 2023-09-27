
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../Reducers";
import {persistStore,persistReducer} from 'redux-persist'
import storage  from "redux-persist/lib/storage";

const persistConfig={
    key:'main-root',
    storage,
}

const persistedReducers=persistReducer(persistConfig,reducers);
const store=createStore(persistedReducers,compose(applyMiddleware(reduxThunk)))
// const store = createStore(reducers, compose(applyMiddleware(reduxThunk)));

const Persister=persistStore(store)

export{Persister};
export default store;
