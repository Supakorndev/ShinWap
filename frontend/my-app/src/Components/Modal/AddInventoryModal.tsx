import React, {ChangeEvent, ChangeEventHandler, useState} from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button } from '@mui/material';
import { SelectGroup } from '../../interfaces/Inventory';
import { config } from '../../assets/Utils function/config';
import swal from 'sweetalert';
const AddInventoryModal : React.FC<{isOpenAddIn : boolean, 
    setIsOpenAddIn : React.Dispatch<React.SetStateAction<boolean>>,
    setIsRefresh : React.Dispatch<React.SetStateAction<boolean>>}> = ({isOpenAddIn, setIsOpenAddIn,setIsRefresh}) => {
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        bgcolor: "#90EE90",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
      const [selectGroup, setSelectGroup] = useState<SelectGroup>({
        title : '',
        brand : '',
        mfd : new Date(),
        type : '',
        total : 0,
        current_price_per : 0
      })
    const handleClose = () =>{
        setIsOpenAddIn(false)
    }
    const handleChange = (e : SelectChangeEvent) =>{
        setSelectGroup({
            ...selectGroup,
            [e.target.name] : e.target.value
        })
    }
    const AddInventory = async () =>{
        let result = await axios.post("http://localhost:3001/add/inventory",selectGroup,config)
        if(result.data === "Success !"){
            swal("Finish", "เพิ่มสินค้าสําเร็จ", "success")
            setIsOpenAddIn(false)
            setIsRefresh(true)
        }else{
            swal("Oops", "เกิดข้อผิดพลาด", "error")
            setIsOpenAddIn(false)
        }
    }
  return (
    <>
      <Modal
      open={isOpenAddIn}
      onClose={handleClose}>
        <Box sx={style}>
            <Grid container
            direction={'column'}
            alignItems={'center'}>
                <Grid xs={12}>
                    <h2>เพิ่มสินค้าคงคลัง</h2>
                </Grid>
            </Grid>
            <Grid container>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ชื่อสินค้า : </h4>
              <input
                style={{
                  width: "60%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                onChange={handleChange}
                name="title"
                type="text"
              />
            </Grid>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ยี่ห้อสินค้า : </h4>
              <input
                style={{
                  width: "60%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                onChange={handleChange}
                name="brand"
                type="text"
              />
            </Grid>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>วันที่ผลิตสินค้า : </h4>
              <input
                style={{
                  width: "60%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                onChange={handleChange}
                name="mfd"
                type="date"
              />
            </Grid>
          </Grid>
          <Grid container paddingTop={"1%"}>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ประเภทสินค้า : </h4>
              <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  name="type"
                  onChange={handleChange}
                >
                    <MenuItem value={'MACHINE'}>MACHINE</MenuItem>
                    <MenuItem value={'SPARE_PART'}>SPARE_PART</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>จํานวนคงคลัง : </h4>
              <input
                style={{
                  width: "50%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                onChange={handleChange}
                name="total"
                type="text"
              />
            </Grid>
            <Grid xs={4} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ราคา ณ ปัจจุบัน : </h4>
              <input
                style={{
                  width: "50%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                onChange={handleChange}
                name="current_price_per"
                type="text"
              />
            </Grid>
          </Grid>
          <Grid container paddingTop={'1%'} direction={'column'} alignItems={'center'}>
            <Grid xs={12}>
                <Button variant="contained" color="success" onClick={AddInventory}>เพิ่มสินค้า</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default AddInventoryModal