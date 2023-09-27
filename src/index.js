import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store,{Persister} from './Components/Common/Store';
import {PersistGate} from 'redux-persist/es/integration/react'//called for redux store is not empty while refresh browser

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
     <PersistGate loading={null} persistor={Persister}>
      <App />
      </PersistGate > 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
