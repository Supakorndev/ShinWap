import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TableInventory from '../Components/TableInventory'
import {UserData} from '../interfaces/User/index'
import {InventoryData} from '../interfaces/Inventory/index'
import {config} from '../assets/Utils function/config'
import Grid from '@mui/material/Grid';

export default function Inventory() {
  const navigate = useNavigate()
  const [inventory, setInventory] = useState<InventoryData[]>()
  const [userData, setUserData] = useState<UserData>()
  const [isRefreshAll, setIsRefreshAll] = useState<boolean>(false)
  useEffect(()=>{
    if(!document.cookie.substring(6)){
        navigate("/")
    }
    fetchUserData()
    fetchAllInventory()
  },[])

  useEffect(()=>{
    if(isRefreshAll === true){
      fetchAllInventory()
      setIsRefreshAll(false)
    }
  },[isRefreshAll])

  const fetchAllInventory = async () =>{
    let result = await axios.get("http://localhost:3001/inventory", config)
    setInventory(result.data)
  }

  const fetchUserData = async () =>{
    let result = await axios.get("http://localhost:3001/user/me", config)
    setUserData(result.data)
  }

  return (
    <Grid container
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    style={{paddingTop:'5%'}}>
      <Grid xs={12}>
        {!!inventory && <TableInventory details={inventory} setIsRefreshAll={setIsRefreshAll}/>}
      </Grid>
    </Grid>
  )
}
