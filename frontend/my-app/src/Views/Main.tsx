import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TableTransaction from '../Components/TableTransaction';
import {UserData} from '../interfaces/User/index'
import {Transaction} from '../interfaces/Transaction/index'
import {config} from '../assets/Utils function/config'
import Grid from '@mui/material/Grid';

export default function Main() {
  const [userData, setUserData] = useState<UserData>()
  const [transaction, setTransaction] = useState<Transaction[]>()
  const [isRefreshAll, setIsRefreshAll] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!document.cookie.substring(6)){
        navigate("/")
    }
    fetchUserData()
  },[])

  useEffect(()=>{
    if(!!userData){
        fetchAllTransaction()
    }
  },[userData])

  useEffect(()=>{
    if(isRefreshAll === true){
      fetchAllTransaction()
      setIsRefreshAll(false)
    }
  },[isRefreshAll])

  const fetchUserData = async () =>{
    let result = await axios.get("http://localhost:3001/user/me", config)
    setUserData(result.data)
  }

  const fetchAllTransaction = async () =>{
    let result = await axios.get("http://localhost:3001/transaction", config)
    setTransaction(result.data)
  }
  return (
    <Grid container
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    style={{paddingTop:'5%'}}>
        <Grid xs={12}>
          {!!transaction && <TableTransaction details={transaction} setIsRefreshAll={setIsRefreshAll}/>}
        </Grid>
    </Grid>
  )
}
