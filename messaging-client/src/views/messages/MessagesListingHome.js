import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CustomeMaterialTable from '../../components/CustomMaterialTable';
import React, { useEffect, useState, Fragment } from 'react';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Typography from "@material-ui/core/Typography";
import Cookies from 'js-cookie';


const MessagesListingHome = (props) => {


    const [open, setOpen] = React.useState(false);
    const [mailScreenDialog, setMailScreenDialog] = React.useState(false);
    const [forwardScreenDialog, setForwardScreenDialog] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [userList, setUserList] = React.useState([]);
    const [composeMailData, setComposeMailData] = React.useState({ recieverId: "", messageContent: "" });

    const [messagesList, setMessagesList] = React.useState([]);

    const [selectRowData, setSelectRowData] = React.useState({
        "message_mapping_id": "",
        "message_content": "",
        "sender_id": "",
        "sender_name": "",
    });

    const handleChange = (e) => {

        setComposeMailData({ ...composeMailData, [e.target.name]: e.target.value })

    }


    let columnList = [

        { title: 'Sender Name', field: 'sender_name', grouping: false },
        { title: 'Message', field: 'message_content', grouping: false },
        { title: 'Message Owner', field: 'message_owner', grouping: false },
        { title: 'Time', field: 'entry_date', grouping: false },

    ]

    useEffect(() => {



        const getMessageList = async () => {


            let result = [];
            let url = 'http://localhost:4000/messages/message-listing/' + sessionStorage.getItem("loginUserId");

            await axios
                .get(url, { withCredentials: true })
                .then((response) => {
                    result = response.data.content.messagesList;
                    setMessagesList(result);
                })
                .catch((err) => {
                    console.log(err);
                });

            return result;


        }


        const getUserList = async () => {


            let result = [];
            let url = 'http://localhost:4000/users/user-list/' + sessionStorage.getItem("loginUserId");

            await axios
                .get(url, { withCredentials: true })
                .then((response) => {
                    result = response.data.content.userList;

                    let arr = [];
                    result.forEach(element => {


                        if (element._id !== sessionStorage.getItem("loginUserId")) {

                            arr.push(<MenuItem key={element._id} value={element._id}>
                                {`${element.first_name} ${element.last_name}`}
                            </MenuItem>);
                        }

                    });
                    setUserList(arr);
                })
                .catch((err) => {
                    console.log(err);
                });

            return result;


        }

        getMessageList();
        getUserList();
    }, [document.cookie]);

    const rowClickAction = (rowData) => {
        setMailScreenDialog(true);
        setSelectRowData(rowData)


    }

    const sendMessage = async () => {

        let url = 'http://localhost:4000/messages/send-message/' + sessionStorage.getItem("loginUserId");

        let payload = {

            "senderId": sessionStorage.getItem("loginUserId"),
            "recieverId": composeMailData.recieverId,
            "messageContent": composeMailData.messageContent

        };

        console.log("payload : ", payload)
        await axios
            .post(url, payload, { withCredentials: true })
            .then((response) => {
                NotificationManager.success(`Message Sent`);
                setOpen(false);
                setComposeMailData({ recieverId: "", messageContent: "" });
            })
            .catch((err) => {
                console.log(err);
            });




    }

    const handleforwardMessageToClick = async () => {

        setForwardScreenDialog(true);


    }


    const handleforwardMessageClick = async () => {

        let url = 'http://localhost:4000/messages/forward-message/' + sessionStorage.getItem("loginUserId");

        let payload = {

            "senderId": sessionStorage.getItem("loginUserId"),
            "recieverId": composeMailData.recieverId,
            "forwardMessageMappingId": selectRowData.message_mapping_id

        }

        console.log("payload : ", payload)
        await axios
            .post(url, payload, { withCredentials: true })
            .then((response) => {
                NotificationManager.success(`Message Sent`);
                setForwardScreenDialog(false);
                setMailScreenDialog(false);
                setComposeMailData({ recieverId: "", messageContent: "" });
            })
            .catch((err) => {
                console.log(err);
            });




    }


    return (

        <Fragment>
            <Grid container style={{ marginTop: '5%' }}>

                <Grid item lg={2}>
                </Grid>
                <Grid item lg={8}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} >

                        </Grid>
                        <Grid item lg={4} >

                        </Grid>
                        <Grid item lg={4} >

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item lg={2}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Compose
                    </Button>
                </Grid>





            </Grid>

            <Grid container style={{ marginTop: '5%' }}>
                <Grid item lg={1}>

                </Grid>
                <Grid item lg={10}>
                    <CustomeMaterialTable rowClickAction={rowClickAction} data={messagesList} columnList={columnList} />
                </Grid>

                <Grid item lg={1}>

                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}

                style={{ paddingTop: "3%" }}
                maxWidth={"md"}
                fullWidth={true}
            >
                <DialogTitle id='classic-modal-slide-title' disableTypography>
                    <Button
                        simple
                        key='close'
                        aria-label='Close'
                        style={{ float: "right" }}
                        onClick={() => {
                            setOpen(false);
                            setComposeMailData({ recieverId: "", messageContent: "" })
                        }}>

                        <Close />
                    </Button>
                </DialogTitle>
                <DialogContent id='classic-modal-slide-description'>
                    {/* <Typography variant='h6' component='h6' style={{ display: 'flex' }}>
                    {"send to"}
                </Typography> */}



                    <FormControl margin='normal' fullWidth>
                        <InputLabel htmlFor='project'>Users</InputLabel>



                        <Select id='recieverId' name='recieverId' onChange={handleChange} value={composeMailData.recieverId}>
                            <MenuItem value='none'>-- Select User --</MenuItem>
                            {userList}
                        </Select>






                    </FormControl>

                    <FormControl margin='normal' fullWidth>
                        <InputLabel htmlFor='project'>Message</InputLabel>


                        <Input
                            //  id='project.project_name'
                            name='messageContent'
                            type='text'
                            disable
                            autoFocus
                            onChange={handleChange}
                            value={composeMailData.text
                            }
                        />




                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={sendMessage}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={mailScreenDialog}
                onClose={() => setMailScreenDialog(false)}

                style={{ paddingTop: "3%" }}
                maxWidth={"md"}
                fullWidth={true}
            >
                <DialogTitle id='classic-modal-slide-title' disableTypography>

                    <Typography variant='h6' component='h6' style={{ display: 'flex' }}>
                        {`Sender Name - ${selectRowData.sender_name}`}
                    </Typography>



                    <Button
                        simple
                        key='close'
                        aria-label='Close'
                        style={{ float: "right" }}
                        onClick={() => {
                            setMailScreenDialog(false);
                        }}>

                        <Close />
                    </Button>
                </DialogTitle>
                <DialogContent id='classic-modal-slide-description'>
                    {/* <Typography variant='h6' component='h6' style={{ display: 'flex' }}>
                    {"send to"}
                </Typography> */}

                    <FormControl margin='normal' fullWidth>
                        <InputLabel htmlFor='project'>Message</InputLabel>


                        <Input
                            //  id='project.project_name'
                            name='messageContent'
                            type='text'
                            disable={true}
                            autoFocus={false}
                            onChange={handleChange}
                            value={selectRowData.message_content
                            }
                        />




                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleforwardMessageToClick}>
                        Forward Message To
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={forwardScreenDialog}
                onClose={() => setForwardScreenDialog(false)}

                style={{ paddingTop: "3%" }}
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle id='classic-modal-slide-title' disableTypography>
                    <Typography variant='h6' component='h6'>
                        {`Forward Message To`}
                    </Typography>


                    <Button
                        simple
                        key='close'
                        aria-label='Close'
                        style={{ float: "right" }}
                        onClick={() => {
                            setForwardScreenDialog(false);
                        }}>

                        <Close />
                    </Button>
                </DialogTitle>
                <DialogContent id='classic-modal-slide-description'>
                    {/* <Typography variant='h6' component='h6' style={{ display: 'flex' }}>
                    {"send to"}
                </Typography> */}

                    <FormControl margin='normal' fullWidth>
                        <InputLabel htmlFor='project'>Users</InputLabel>



                        <Select id='recieverId' name='recieverId' onChange={handleChange} value={composeMailData.recieverId}>
                            <MenuItem value='none'>-- Select User --</MenuItem>
                            {userList}
                        </Select>






                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleforwardMessageClick}>
                        Forward Message
                    </Button>
                </DialogActions>
            </Dialog>

        </Fragment>



    )
}
export default MessagesListingHome;