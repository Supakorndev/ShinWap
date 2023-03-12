import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {config} from '../assets/Utils function/config'
import {useNavigate} from 'react-router-dom'

interface Login{
    email : string,
    password : string
}
export default function Login() {

    const navigate = useNavigate();
    const [login, setLogin] = useState<Login>({
        email: '',
        password: ''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    const onLogin = () =>{
        let loginForm = {
            email : login.email,
            password : login.password
        }
        axios.post("http://localhost:3001/user/login", loginForm)
        .then((res)=>{
            console.log(res.data)
            document.cookie = "token = "+res.data.token
            if(document.cookie.length > 8){
                config.headers.authorization = 'Bearer '+document.cookie.substring(6)
                navigate("/Main")
            }
        })
    }
  return (
    <Grid container style={{backgroundColor: '#90EE90'}}>
        <Grid xs={12} style={{display:'flex', justifyContent:'center', paddingTop:'10%'}}>
            <Card style={{marginLeft:'30%', marginRight:'30%'}}>
                <CardContent>
                    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                        <img src={require('../assets/Logo.jpg')} style={{width:'20%'}}/>
                        <h1>Wap Machinary</h1>
                    </div>
                    <Grid container>
                        <Grid xs={12}>
                            <TextField id="filled-basic" label="Email" variant="filled" style={{width:'100%'}} name="email"
                            onChange={handleChange}/>
                        </Grid>
                        <Grid xs={12} style={{paddingTop:'3%'}}>
                            <TextField id="filled-basic" label="Password" variant="filled" style={{width:'100%'}} name="password"
                            type="password" onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <div style={{display: 'flex', paddingTop:'5%', flexDirection:'column', alignItems:'flex-end', marginTop:'-3%'}}>
                        Forgot password ?
                    </div>
                    <div style={{display: 'flex', paddingTop:'5%', flexDirection:'column', alignItems:'center'}}>
                        <button style={{padding:'10px', borderRadius:20, border:'1px solid #90EE90', backgroundColor:'#90EE90', color:'white', width:'50%'}}
                        onClick={onLogin}>Login</button>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}
