import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Styles = theme => ({
    card: {
    //   maxWidth: 545,
    boxShadow: '12px 15px 20px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '12px 15px 20px rgba(0, 0, 0, 0.1)',
      transition: "0.2s box-shadow ease-in-out, 0.2s background-color ease-in-out, 0.2s border-color ease-in-out"
    },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardContainer:{
        marginLeft:'auto',
        marginRight:'auto',
        width:'70%',
        marginBottom:50,
        marginTop:50
    },
    bottomDetails:{
        margin:'5px 0 5px 0'
    },
    title:{
        fontSize:'5em'
    }
  });
  

class BankDetails extends Component{ 
    state={
        bankID:'',
    }
    componentDidMount(){
        let bankID = this.props.match.params.bank_id;
        this.setState({bankID:bankID});
    }
    render(){
        // console.log(this.state.bankID)
        const retrievingData = JSON.parse(localStorage.getItem('bankLocalData'))
        const newArray = retrievingData.filter(element => element.bank_id === Number(this.state.bankID));
        const firstArray = newArray.slice(0,1);
        const { classes } =this.props;
        // console.log(firstArray)
        const item = firstArray.map(items=>{
            return(
                <div className={classes.cardContainer} key={items.bank_id +'p'}>
                <Card className={classes.card} >
                    <CardMedia
                        className={classes.media}
                        image="Images/bank2.jpeg"
                        title={items.bank_name}
                    />
                    <CardContent>
                    <Typography variant="h5" component="h2" className={classes.bottomDetails}>
                         Bank Name : {items.bank_name}
                        </Typography>
                        <Typography variant="h5" component="h2" className={classes.bottomDetails}>
                         Location : {items.city +' ,' +items.state}
                        </Typography>
                        <hr/>
                        <Typography variant="h5" component="h2" className={classes.bottomDetails} >
                         IFSC : {items.ifsc} 
                        </Typography>
                        <Typography variant="h5" component="h2"  className={classes.bottomDetails} >
                         Branch : {items.branch} 
                        </Typography>
                        <Typography variant="h5" component="h2"  className={classes.bottomDetails} >
                         Address : {items.address}   
                        </Typography>
                    </CardContent>
                    
            </Card>
            </div>
            )
        })
    return(
        <>
          {item}
        </>
    )
}
}
export default withStyles(Styles)(BankDetails);