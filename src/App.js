import React from 'react';
import { HashRouter as Router, Route, Switch}  from 'react-router-dom';
import AppRoute from './routes/AppRoute';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import api from 'redux-cached-api-middleware';

export const init = () => {
  api.config.DEFAULT_INVOKE_OPTIONS = {
    method: 'GET',
    headers: { Accept: 'application/json' },
  };
  api.config.DEFAULT_CACHE_STRATEGY = api.cache
    .get(api.constants.CACHE_TYPES.TTL)
    .buildStrategy({ ttl: 10 * 60 * 1000 }); 
};


const AppContainer =() =>{
  return (
    <Router>
         <Route component={NavBar}/>
         <Switch>
           <Route component={AppRoute}/>
         </Switch>
         <Route component={Footer}/>
    </Router>
  );
}

const App = ()=>{
  return(
    <Router>
      <Route component={AppContainer}/>
    </Router>
  )
}

export default App;