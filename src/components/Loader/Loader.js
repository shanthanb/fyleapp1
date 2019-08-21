import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  loadingContainer: {
    position: 'fixed',
    width: '100%',
    top: '50px',
    paddingTop: '50%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: '1000',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '20%',
    },
    [theme.breakpoints.only('lg')]: {
      position: 'fixed',
      width: '100%',
      top: '50px',
      paddingTop: '50%',
      height: '100%',
      backgroundColor: '#fff',
      zIndex: '1000',
      left: '0px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: '40%',
      zIndex: '1000',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '25%',
    },
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
});

class Loader extends React.Component {
  render() {
    const { classes } = this.props;
    const loadText = this.props.loadText
      ? this.props.loadText
      : 'Please Wait Its Loading....';
    return (
      <div className={classes.loadingContainer}>
        <div className={classes.centered}>
          <CircularProgress color="secondary" />
          <br />
          <br />
          <Typography variant="h5" component="h4">{loadText}</Typography>
        </div>
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
