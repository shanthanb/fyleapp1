import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        textAlign:'center',
        color:'white',
        fontSize:'1.2em',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      FootContainer:{
        background:'#3379b7'
      }
})


export default withStyles(styles)(({classes}) =>{
    return(
        <div className={classes.root}>
            <AppBar position="static" className={classes.FootContainer}>
                <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Developed By Anit Kumar <span role="img" aria-label="happy mode">😄</span>
                </Typography>
                </Toolbar>
            </AppBar>
    </div>
    )
})