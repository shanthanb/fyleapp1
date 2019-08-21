import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import api from 'redux-cached-api-middleware';
import './index.css';
import Home from './index';

import { OutlinedInput,
         InputLabel,
         FormControl,
         Select,
         withStyles,
         Grid 
} from '@material-ui/core';

const styles = theme =>({
      formControl: {
        margin: theme.spacing(3),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      selectPaddingOpt:{
        margin:'10px',
        fontSize:'14px',
        color: '#ec407a',
      },
  })

 
class DataProvider extends Component{
 constructor(){
   super()
      this.state = {
        cityName:'BANGALORE',
        loadText:'Please Wait Its Loading....',
    };
 }
  componentDidMount(){
    const { cityName } = this.state;
    const { fetchUserData } = this.props;
    fetchUserData(cityName);
  }

  handleChange = event => {
    const { fetchUserData } = this.props;
    const cityName = event.target.value;
    this.setState({
        cityName,
        loadText:`Please wait loading Bank's details from ` + event.target.value
      })
    fetchUserData(cityName);
   
  };

    render(){
        const { classes,loading, getResult} = this.props;
        const { cityName } = this.state;
          if(loading){
            return<Loader loadText={this.state.loadText}/>
          }else{
        return(
            <>  
               <br/>
                <div className={['container'].join(' ')}>
                  <Grid container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          >
                    <Grid item>
                      <FormControl variant="outlined" 
                                   className={classes.formControl}
                                   >
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="explore-city"
                            />
                            <Select
                              native
                              value={this.state.cityName}
                              onChange={this.handleChange}
                              style={{ height: '30px',fontSize:'14px'}}
                              input={
                                <OutlinedInput
                                  name="city"
                                  labelWidth={this.state.labelWidth}
                                  id="explore-city"
                                />
                              }
                            >
                              {['Bangalore','Mysore','Mumbai','Delhi','Patna'].map(city => (
                                <option key={city + 'i'} value={city} className={classes.selectPaddingOpt}>
                                  {city}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                      </Grid>
                  
                 </Grid>
              </div>
              {cityName && <Home data={getResult(cityName)} />}
            </>
        )
      }
  }
}

DataProvider.propTypes = {
    getResult: PropTypes.func.isRequired,
    fetchUserData: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
   
  };

const enhance = connect(
    state => ({
      getResult: cityName => api.selectors.getResult(state, cityName),
    }),
    dispatch => ({
      fetchUserData(cityName) {
        return dispatch(
          api.actions.invoke({
            endpoint: `https://vast-shore-74260.herokuapp.com/banks?city=${cityName.toUpperCase()}`,
            cache: { key: cityName },
          })
        );
      },
    })
  );
  
export default (withStyles(styles)(enhance(DataProvider)));