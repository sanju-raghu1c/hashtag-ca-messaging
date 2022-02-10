import React from 'react';
import './Header.css';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MessageIcon from '@material-ui/icons/Message';
import { withStyles } from "@material-ui/core/styles";


const WhiteCreateIcon = withStyles({
    root: {
        color: "white"
    }
})(MessageIcon);
const Header = (props) => (

    <Grid container className="header">

        <Grid item lg={4}>
            <>
         
                <div className="MessagingLogo">
                <WhiteCreateIcon />
                    <Typography variant='h6' component='h6' style={{ color: 'white', marginLeft: '2%', marginTop: '-1%' }}>#Hashtag Messaging App  </Typography>


                </div>


            </>
        </Grid>
        <Grid item lg={6}>

        </Grid>
        <Grid item lg={2}>

        <Typography variant='h6' component='h6' style={{ color: 'white', marginLeft: '2%', marginTop: '-1%' }}>{  sessionStorage.getItem("loginName")}  </Typography>

      
         



        </Grid>
    </Grid>



)
export default Header;