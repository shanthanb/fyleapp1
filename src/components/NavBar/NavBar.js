import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import links from '../../utility/Links';

const styles = theme =>({
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        fontSize:'1.2em',
        display: 'none',
        color:'white',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      AppContainer:{
        background:'#3379b7'
      }
      
})

export default withStyles(styles)(({classes}) =>{
 return(
    <div className={classes.root}>
      <AppBar position="static"className={classes.AppContainer} >
        <Toolbar>
          <Link to={links.home()} style={{textDecoration:'none'}}>
            <Typography className={classes.title} variant="h6" noWrap>
             Front End Coding Challenge
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
 )
})