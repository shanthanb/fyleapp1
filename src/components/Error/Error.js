import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>({
    root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
        textAlign:'center',
        padding:'50px 0 50px 0',
        fontSize:'2em',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
})

const Error = ({classes}) =>{
    return(
        <>
         <Typography className={classes.title} variant="h6" noWrap>Encounter error ,Please try after some time  
            <span role="img" aria-label="Message">😢</span><br/><br/>
         </Typography>
        </>
    )
}

export default withStyles(styles)(Error);