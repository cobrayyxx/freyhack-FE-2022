import { Box, TextField, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';

function Register() {
    let navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {
            username : Username,
            email : Email,
            password : Password
        }
        console.log(data)
        axios.post(`https://freyhack-be-2022.herokuapp.com/api/v1/register`, data)
        .then(response => navigate((`/home`)))
        .catch(error => {
            console.error('There was an error!', error);
            alert("Cannot register")
            });
    }
    return (
        <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{backgroundColor:'white', mt:10 ,mx: "auto", p: 5, borderRadius: '5px', width: "50%"}}>
            <Typography variant="h5" sx={{m:1, p: 1}}>
                Register Account
            </Typography>
            <TextField
            required
            id="outlined-required"
            label="Username"
            sx={{width:"100%", m:1}}
            onChange = {handleUsername}
            />
            <TextField
            required
            id="outlined-required"
            label="Email"
            sx={{width:"100%", m:1}}
            onChange = {handleEmail}
            />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{width:"100%", m:1}}
            onChange = {handlePassword}
            />
            <Button
            type="submit"
            variant="contained"
            sx={{m:1}}>
            Register
            </Button>
        </Box>
    )
}

export default Register