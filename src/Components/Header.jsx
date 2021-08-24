import { AppBar,Toolbar, Card, CardMedia,Grid,makeStyles} from '@material-ui/core';
import React from 'react';
import logo from '../logo.png';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';
const Header = () => {
    
    const { currentUser } = useContext(AuthContext);
    //console.log(currentUser);
    let useStyles=makeStyles({
       toolbar:{
            //marginLeft:"20px",
            margin:"auto",
            width:"82vw",
            display:"flex",
            justifyContent:"space-between"
       },
       appbar:{
              height:"5rem",
              backgroundColor:"white"
            },
    });
    let classes=useStyles();
    //console.log(currentUser);
    return ( 
        <AppBar position="sticky" color="inherit"  className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                       <img src={logo}  alt="" style={{height:"100%",width:"20%"}}/>
                       <div style={{
                           display: "flex",
                           justifyContent: "space-between",
                           height: "30%",
                           width: "10%",
                           marginRight:"10%"
                       }}>
                       <HomeIcon>
                           <Link to="/"></Link>
                       </HomeIcon>
                       <PersonIcon >
                       <Link to="/profile"></Link>
                       </PersonIcon>
                       </div>
            </Toolbar>
        </AppBar>) ;
}
 
export default Header;