import React, {useState, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ViewTransactionModal from "./Modal/ViewTransactionModal";
import {TransactionProps, Transaction} from '../interfaces/Transaction/index'
import AddTransactionModal from "./Modal/AddTransactionModal";

const TableTransaction: React.FC<TransactionProps> = ({ details, setIsRefreshAll }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [idNow, setIdNow] = useState<Transaction>()
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  useEffect(()=>{
    if(isRefresh === true){
      setIsRefreshAll(true)
      setIsRefresh(false)
    }
  },[isRefresh])
  const handleOpen = (e : React.MouseEvent<HTMLElement>, item : Transaction) => {
    setIsOpen(true)
    setIdNow(item)
  };
  const handleAddTran = () =>{
    setIsOpenAdd(true)
  }
  return (
    <TableContainer style={{ backgroundColor: "white"}}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">รายการที่</TableCell>
            <TableCell align="center">วิธีการชําระเงิน</TableCell>
            <TableCell align="center">สถานะ</TableCell>
            <TableCell align="center">ยอดค้างชําระ</TableCell>
            <TableCell align="center">กําหนดชําระเงิน</TableCell>
            <TableCell align="center">วันที่จัดส่ง</TableCell>
            <TableCell align="center">สถานะการจัดส่ง</TableCell>
            <TableCell align="center">
                <Button variant="contained" color="success" onClick={handleAddTran}>
                  Add Transaction
                </Button>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!details === false &&
            details?.map((item) => (
              <TableRow key={item.tran_id}>
                <TableCell align="center">{item.tran_id}</TableCell>
                <TableCell align="center">{item.payment_method}</TableCell>
                <TableCell align="center">{item.payment_status}</TableCell>
                <TableCell align="center">{item.credit}</TableCell>
                <TableCell align="center">
                  {item.credit_due_date?.toString().substring(0, 10)}
                </TableCell>
                <TableCell align="center">
                  {item.delivery_date?.toString().substring(0, 10)}
                </TableCell>
                <TableCell align="center">{item.delivery_status.toString() === '0' ? 'ยังไม่จัดส่ง' : 'จัดส่งสําเร็จ'}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success" onClick={(e)=>handleOpen(e,item)}>
                    View
                  </Button>
                  <Button variant="contained" color="error" style={{marginLeft:'3%'}}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!!idNow && <ViewTransactionModal isOpen={isOpen} setIsOpen={setIsOpen} idNow={idNow}/>}
      <AddTransactionModal isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} setIsRefresh={setIsRefresh}/>
    </TableContainer>
  );
};

export default TableTransaction;
