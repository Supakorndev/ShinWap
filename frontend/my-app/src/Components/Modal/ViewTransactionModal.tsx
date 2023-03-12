import React, {useState, useEffect} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";
import Grid from '@mui/material/Grid';
import {TransactionModalProps, TransactionById} from '../../interfaces/Transaction/index'
import {config} from '../../assets/Utils function/config'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from '@mui/material/TableFooter';

const ViewTransactionModal : React.FC<TransactionModalProps> = ({isOpen, setIsOpen, idNow}) =>{
    const handleClose = () => setIsOpen(false);
    const [TransactionDetail, setTransactionDetail] = useState<TransactionById[]>()
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: '#90EE90',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    useEffect(()=>{
        if(!!idNow){
            fetchTransactionById()
        }
    },[])
    
    useEffect(()=>{
        if(!!idNow){
            fetchTransactionById()
        }
    },[idNow])

    const fetchTransactionById = async () =>{
        let result = await axios.get("http://localhost:3001/transaction/"+idNow.tran_id, config)
        setTransactionDetail(result.data)
    }
    return(
        <>
        { !!TransactionDetail &&
        <Modal
        open={isOpen}
        onClose={handleClose}>
        <Box sx={style}>
          <div style={{display:'flex', justifyContent:'center'}}>
            <h1>รายการธุรกรรมที่ {idNow.tran_id}</h1>
          </div>
          <Grid container>
            <Grid xs={6}>
                <h3>ผู้ดําเนินธุรกรรม : {TransactionDetail[0]?.fname} {TransactionDetail[0]?.lname}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>บริษัทคู่ค้า : {TransactionDetail[0]?.par_fname} {TransactionDetail[0]?.par_lname}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>วิธีการชําระเงิน : {idNow.payment_method}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>สถานะการชําระเงิน : {idNow.payment_status}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>ยอดค้างชําระ : {idNow.credit}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>กําหนดชําระเงิน : {idNow.credit_due_date.toString().substring(0,10)}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>วันที่จัดส่ง : {idNow.delivery_date.toString().substring(0,10)}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>สถานะการจัดส่ง : {idNow.delivery_status.toString() === '0' ? 'ยังไม่จัดส่ง' : 'จัดส่งสําเร็จ'}</h3>
            </Grid>
            <Grid xs={6}>
                <h3>รายการสินค้า</h3>
            </Grid>
            <Grid xs={12}>
                <TableContainer style={{ backgroundColor: "white" }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รายการที่</TableCell>
                                <TableCell align="center">ชื่อสินค้า</TableCell>
                                <TableCell align="left">ประเภทของสินค้า</TableCell>
                                <TableCell align="center">วันที่ผลิต</TableCell>
                                <TableCell align="center">ราคารวม</TableCell>
                                <TableCell align="center">จํานวน</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {TransactionDetail?.map((item, index)=>(
                                <TableRow>
                                    <TableCell align="center">{index+1}</TableCell>
                                    <TableCell align="left">{item.title}</TableCell>
                                    <TableCell align="left">{item.brand}</TableCell>
                                    <TableCell align="center">{item.mfd.toString().substring(0,10)}</TableCell>
                                    <TableCell align="center">{item.price}</TableCell>
                                    <TableCell align="center">{item.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableCell align="center">ราคารวมทั้งสิ้น</TableCell>
                            <TableCell align="center">{TransactionDetail.reduce((item, currentValue)=> item + currentValue.price, 0)} บาท</TableCell>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
        </>
    )
}

export default ViewTransactionModal