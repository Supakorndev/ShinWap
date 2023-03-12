import React,{useState, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import {InventoryProps, InventoryData} from '../interfaces/Inventory/index'
import EditInventoryModal from "./Modal/EditInventoryModal";
import AddInventoryModal from "./Modal/AddInventoryModal";

const TableInventory: React.FC<InventoryProps> = ({details, setIsRefreshAll}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenAddIn, setIsOpenAddIn] = useState<boolean>(false)
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const [inventoryDetail, setInventoryDetail] = useState<InventoryData>()
  const handleOpen = (inventoryDetail : InventoryData) =>{
    setIsOpen(true)
    setInventoryDetail(inventoryDetail)
  }
  useEffect(()=>{
    if(isRefresh === true){
      setIsRefreshAll(true)
      setIsRefresh(false)
    }
  },[isRefresh])
  return (
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">รายการที่</TableCell>
            <TableCell align="center">ชื่อสินค้า</TableCell>
            <TableCell align="center">วันที่ผลิต</TableCell>
            <TableCell align="center">ยี่ห้อสินค้า</TableCell>
            <TableCell align="center">ประเภทสินค้า</TableCell>
            <TableCell align="center">จํานวนคงคลัง</TableCell>
            <TableCell align="center">ราคา ณ ปัจจุบัน</TableCell>
            <TableCell align="center">
              <Button variant="contained" color="success" onClick={()=> setIsOpenAddIn(true)}>
                  Add
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!details === false &&
            details?.map((item) => (
              <TableRow key={item.pro_id}>
                <TableCell align="center">{item.pro_id}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">
                  {item.mfd?.toString().substring(0, 10)}
                </TableCell>
                <TableCell align="center">{item.brand}</TableCell>
                <TableCell align="center">{item.type}</TableCell>
                <TableCell align="center">{item.total}</TableCell>
                <TableCell align="center">{item.current_price_per}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="error" onClick={()=>{handleOpen(item)}}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!!inventoryDetail && <EditInventoryModal isOpen={isOpen} inventoryDetail={inventoryDetail} setIsOpen={setIsOpen} setIsRefresh={setIsRefresh}/>}
      <AddInventoryModal isOpenAddIn={isOpenAddIn} setIsOpenAddIn={setIsOpenAddIn} setIsRefresh={setIsRefresh}/>
    </TableContainer>
  );
};

export default TableInventory;
