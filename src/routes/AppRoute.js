import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BankDetails from '../pages/BankDetails';
import Home from '../pages/Home/dataProvider';
import FavBank from '../pages/FavouriteBanks/index';

class  AppRoutes extends React.Component{
    render(){
        const { match } = this.props;
            return(
                <Switch>
                    <Route path={`${match.path}/`} component={Home}/>
                    <Route path={`${match.path}bank/:bank_id`} component={BankDetails}/>
                    <Route path={`${match.path}favourite`} component={FavBank}/>
                </Switch>
            )
        }
}
export default AppRoutes;