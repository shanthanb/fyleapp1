import React,{ Component} from 'react';
import { Typography, } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';


class FavouriteBank extends Component{
    state={

    }
    componentDidMount(){
       const data = sessionStorage.getItem("favouteData");
       console.log(data);
    }
 render(){
     return(
       <div className="container">
           {this.props.data.length >0 ? (
               <>
                <Typography style={{textAlign:'center',fontSize:'1.2em'}}>
                    {'List Of Favourite Banks'}
                </Typography>
                <table className="table table-dark" >
                    <thead style={{ backgroundColor: fade('#ec407a', 0.75),color:'white'}}>
                        <tr>
                            <th scope="col">Bank Name</th>
                        </tr>  
                    </thead>
                    {this.props.data.map(fv=>
                    <tbody key={Math.floor(Math.random() * 10000) + 1}>
                        <tr>
                            <td style={{color:'green'}}>{fv}</td>
                        </tr>
                    </tbody>
                    
                    )}
                    </table>
                </>
           ):(
               ''
           )}
       </div>
     )
 }
}
export default FavouriteBank;