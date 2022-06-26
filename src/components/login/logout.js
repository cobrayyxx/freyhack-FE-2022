import { Box, TextField, Typography, Button, Stack } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router'
import { Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import qs from 'qs';

function Logout() {
    let navigate = useNavigate()
    const { setCurrentUser, setToken } = useContext(UserContext);

    
    const handleConfirm = async (event) => {
        setCurrentUser();
        setToken()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload();
    }
    
    return (
        <Box 
        component="form" 
        onSubmit={handleConfirm}
        sx={{backgroundColor:'white', mt:15 ,mx: "auto", p: 5, borderRadius: '5px', width: "30%"}}
        >
            <Typography 
            variant="h5" 
            align="center" 
            sx={{ m:1}}>
                You will be logged out of your account
            </Typography>
            <Stack spacing={2} justifyContent="center" direction="row" sx={{ p:1}}>
                <Button onClick={handleConfirm} variant="contained">Continue</Button>
                <Button onClick={event =>  window.location.href='/home'} variant="outlined">Cancel</Button>
            </Stack>
        </Box>
    )
}

export default Logout