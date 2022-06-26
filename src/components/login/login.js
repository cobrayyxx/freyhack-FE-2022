import { Box, TextField, Typography, Button } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router'
import { Link } from "react-router-dom"
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import qs from 'qs';

function Login() {
    let navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const { setCurrentUser, setToken } = useContext(UserContext);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {
            username : Username,
            password : Password
        }
        let post_data = qs.stringify(data)
        console.log(data)
        axios.post(`https://freyhack-be-2022.herokuapp.com/api/v1/login`, post_data,
        {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            }
          })
        .then(response => {
            setCurrentUser(data.username);
            setToken(response.data.access_token)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('user', data.username)
            window.location.reload();
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("Cannot login")
            });
        
    }
    
    return (
        <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{backgroundColor:'white', mt:10 ,mx: "auto", p: 5, borderRadius: '5px', width: "50%"}}
        >
            <Typography 
            variant="h4" 
            align="center" 
            sx={{ m:1, color : "#7DF9FF", fontWeight: 900, fontFamily: 'Lucida Console'}}>
                Aktivitee
            </Typography>
            <Typography 
            variant="h5"
            sx={{ m:1}}>
                Login
            </Typography>
            <TextField
            required
            id="outlined-required"
            label="Username"
            sx={{width:"100%", m:1}}
            onChange = {handleUsername}
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
            Login
            </Button>
            <Typography 
            variant="p"
            display="block"
            sx={{ m:1}}>
                Dont have an account? <Link to="/register">Register here</Link>
            </Typography>
        </Box>
    )
}

export default Login