import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Pagination from '../../components/Pagination/Pagination';
import links from '../../utility/Links';
import { Link } from 'react-router-dom';
import CachedSearch from '../../components/CachedSearch/CachedSearch';
import Loader from '../../components/Loader/Loader';
import FavBnks from '../FavouriteBanks/index';
import ErrorPage from '../../components/Error/Error';
import './index.css';

import { OutlinedInput,
         InputLabel,
         FormControl,
         Select,
         InputBase,
         withStyles,
         Grid 
} from '@material-ui/core';

const styles = theme =>({
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        display: 'none',
        marginLeft:35,
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        fontSize:'14px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(7),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize:'14px',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
            '&::placeholder':{
              color: '#ec407a',
              opacity: 1,
              fontSize:'14px'
            }
          },
        },
       
      },
      paginationContainer:{
        margin:'50px 20px 10px 25px'
      }
      ,
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
      tbleHeader:{
        backgroundColor: fade('#ec407a', 0.75),
        color:'white',
      },
      searchPostion:{
        marginTop:'-95px',
        [theme.breakpoints.down('xs')]: {
          marginTop:'0px',
        },
       
      }
  })

 
class Home extends Component{
 constructor(){
   super()
      this.state = {
        pageOfItems: [],
        cityName:'BANGALORE',
        query: "",
        results: [],
        pageSize:10,
        labelWidth:0,
        loadText:'Please Wait Its Loading....',
        myFavoriteBanks:[],
        isFaved: false,
        color:'black'
    };
 }

  onChangePage =(pageOfItems)=>{
    this.setState({ pageOfItems: pageOfItems });
}
 
  handleQueryChange =(query)=>{
    this.setState({ query });
    this.CachedSearch.changeQuery(query);
  }

  handleResults=(results)=>{
    this.setState({ pageOfItems:results });
  }
  handlePageSizeChange = event => {
    this.setState({ pageSize:event.target.value})
  };

  addFavoriteChange(ifsc) {
    const retrievingData = JSON.parse(localStorage.getItem('bankLocalData'))
    const newArray = retrievingData.filter(element => element.ifsc === ifsc);
    const BankName = newArray.map(item=>item.bank_name);
    this.setState({myFavoriteBanks:[...this.state.myFavoriteBanks,BankName]})
  
    this.state.myFavoriteBanks.forEach(function() {
    document.getElementById(ifsc).className = 'fav';
   });
  }
    render(){
        const { classes,data,} = this.props;
        if (!data) return null;
        let bank = data.successPayload;

        // console.log(data)
        const search = query =>
          new Promise((resolve, reject) => {
            const regex = new RegExp(`^${query}`, "i");
            const results = bank.filter(dataField => {
              return (
                regex.test(dataField.ifsc) ||
                regex.test(dataField.bank_name) ||
                regex.test(dataField.bank_id) ||
                regex.test(dataField.branch) ||
                regex.test(dataField.address) ||
                regex.test(dataField.city) ||
                regex.test(dataField.state) 
              );
            });
            resolve(results);
          });
          this.CachedSearch = new CachedSearch(search, this.handleResults);
          // Storing data in localstorage
          localStorage.setItem('bankLocalData',JSON.stringify(bank));
          if(data.fetching){
            return<Loader loadText={this.state.loadText}/>
          }else if(data.error) {
            return (
             <ErrorPage/>
            );
          }
          else{
        return(
            <>  
            <div className={['container'].join(' ')}>
                  <Grid container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          className={classes.searchPostion}
                          >
                    <Grid item>
                      
                      </Grid>
                  <Grid item>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        onChange={({ target: { value } }) => this.handleQueryChange(value)}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Search' }}
                      />
                    </div>
                  </Grid>
                 </Grid>
              </div>
            <br/>
                <div className={["container","table-responsive"].join(' ')}>
                    <div className={["text-left"].join(' ')}>
                        <table className={["table", "table-dark "].join(' ')}>
                            <thead className={["thead-dark",classes.tbleHeader].join(' ')} >
                                <tr>
                                  <th scope="col">IFSC</th>
                                  <th scope="col">Branch Name</th>
                                  <th scope="col">ID</th>
                                  <th scope="col">Branch</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">District</th>
                                  <th scope="col">State</th>
                                </tr>
                            </thead>
                           { 
                          this.state.pageOfItems.map(item =>
                            <tbody key={'i'+item.ifsc} >
                              <tr className="list">
                                <td onClick={()=>this.addFavoriteChange(item.ifsc)} 
                                    style={{color:'#23527c'}} id={item.ifsc}>
                                      {item.ifsc}
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.bank_name}
                                    </Link>
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.bank_id}
                                    </Link>
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.branch}
                                    </Link>
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.address}
                                    </Link>
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.district}
                                    </Link>
                                  </td>
                                <td>
                                    <Link to={links.bankDetails(item.bank_id)}>
                                      {item.state}
                                    </Link>
                                  </td>
                              </tr>
                            </tbody>
                          )}
                        </table>
                        <Grid container
                              direction="row"
                              justify="space-between"
                              alignItems="center"
                              >
                          <Grid item>
                            <Pagination items={bank} onChangePage={this.onChangePage} 
                                        pageSize={Number(this.state.pageSize)}
                                        />
                          </Grid>
                          <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel
                                ref={ref => {
                                  this.InputPageSizeRef = ref;
                                }}
                                htmlFor="pageDataSize"
                              />
                              <Select
                                native
                                value={this.state.pageSize}
                                onChange={this.handlePageSizeChange}
                                style={{ height: '30px' }}
                                input={
                                  <OutlinedInput
                                    name="pageSize"
                                    labelWidth={this.state.labelWidth}
                                    id="pageDataSize"
                                  />
                                }
                              >
                                {[10,50,100,200,500].map(pgSize => (
                                  <option key={pgSize + 'i'} value={pgSize} className={classes.selectPaddingOpt}>
                                    {pgSize}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid> 
                    </div>
                </div>
                <br/><br/>
                <div>
                  <FavBnks data={this.state.myFavoriteBanks}/>
                </div>
            </>
        )
      }
  }
}

export default (withStyles(styles)(Home));