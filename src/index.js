import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { init } from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/state';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';

init();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
           <App />
        </PersistGate>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
