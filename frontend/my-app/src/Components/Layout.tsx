import React, { Children, ReactElement } from 'react'
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineIcon from '@mui/icons-material/Timeline';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import {config} from '../assets/Utils function/config'
export default function Layout(props : any) {
  const drawerWidth = 240;
  const navigate = useNavigate()
  const onLogout = () =>{
    config.headers.authorization = 'Bearer '
    document.cookie = 'token='
    navigate('/')
  }
  return (
    <div style={{display:'flex'}}>
        <AppBar sx={{width: `calc(100% - ${drawerWidth}px)`}} style={{backgroundColor:'white', color:'black'}}>
            <Toolbar>
                <Typography>{Date()}</Typography>
            </Toolbar>
        </AppBar>
        <Drawer
        variant='permanent'
        anchor='left'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
            <div style={{display:'flex', justifyContent:'center', paddingTop:'5%'}}>
                <img src={require('../assets/Logo.jpg')} style={{width:'20%'}}/>
                <Typography variant='h5' style={{marginTop: '3%', marginLeft:'3%'}}>Wap Machinary</Typography>
            </div>
            <List>
                <ListItem
                button = {true}
                onClick={()=>{
                    navigate("/Main")
                }}>
                    <ListItemIcon><TimelineIcon/></ListItemIcon>
                    <ListItemText>Transaction</ListItemText>
                </ListItem>
                <ListItem
                button = {true}
                onClick={()=>{
                    navigate("/Inventory")
                }}>
                    <ListItemIcon><InventoryIcon/></ListItemIcon>
                    <ListItemText>Inventory</ListItemText>
                </ListItem>
                <ListItem
                button = {true}>
                    <ListItemIcon><PersonPinIcon/></ListItemIcon>
                    <ListItemText>Employees</ListItemText>
                </ListItem>
                <ListItem
                button = {true}>
                    <ListItemIcon><HandshakeIcon/></ListItemIcon>
                    <ListItemText>Partner</ListItemText>
                </ListItem>
            </List>
            <div style={{paddingTop : '55vh', display:'flex', justifyContent:'center'}}>
                <Button variant='contained' color='error' onClick={onLogout}>Logout</Button>
            </div>
        </Drawer>
        <div>
            {props.children}
        </div>
        <Outlet/>
    </div>
  )
}
