import React, { Component } from "react";
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Button, Grid } from '@material-ui/core';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }


    login = async (e) => {


        const loginData = {
            emailId: this.state.formData.email,
            password: this.state.formData.password,
        };

        let Url = `http://localhost:4000/users/login`;
        await axios
            .post(Url, loginData,{ withCredentials: true })
            .then(async function (result) {

                console.log("result : ", result)
                if (result.status === 200) {
                     sessionStorage.setItem("loginUserId",result.data.content._id) ;
                     sessionStorage.setItem("loginName",result.data.content.first_name+" "+result.data.content.last_name);
                    window.location.href = "/home"


                } else {

                    NotificationManager.error("Invalid credentials.")

                }
            })
            .catch((e) => {



            });







    }


    render() {



        return (
            <div className="Login">

                <Grid container style={{ marginTop: '5%' }}>

                    <Grid item lg={4}>
                    </Grid>
                    <Grid item lg={4}>
                        <FormControl margin='normal' fullWidth>
                            <InputLabel htmlFor='email'>Email</InputLabel>


                            <Input
                                //  id='project.project_name'
                                name='email'
                                type='text'
                                disable
                                autoFocus
                                onChange={this.handleInputChange}
                                value={this.state.formData.email
                                }
                            />
                        </FormControl>


                        <FormControl margin='normal' fullWidth>
                            <InputLabel htmlFor='password'>Password</InputLabel>


                            <Input
                                //  id='project.project_name'
                                name='password'
                                type='password'
                                disable
                                autoFocus
                                onChange={this.handleInputChange}
                                value={this.state.formData.password
                                }
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={this.login}>
                            Sign-In
                        </Button>
                    </Grid>

                    <Grid item lg={4}>
                    </Grid>


                </Grid>












            </div>
        )
    }
}

export default Login;