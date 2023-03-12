import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InventoryModalProps, InventoryData } from "../../interfaces/Inventory";
import { Button } from "@mui/material";
import { config } from "../../assets/Utils function/config"
import swal from "sweetalert";

const EditInventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  inventoryDetail,
  setIsOpen,
  setIsRefresh
}) => {
  useEffect(() => {
    if (!!inventoryDetail) {
      setInventory(inventoryDetail);
    }
  }, [inventoryDetail]);
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
  const handleClose = () => {
    setIsOpen(false)
    setInventory(inventoryDetail)
  };
  const [inventory, setInventory] = useState<InventoryData>({
    pro_id : 0,
    title : '',
    mfd : new Date(),
    brand : '',
    type : '',
    total : 0,
    current_price_per : 0
  });
  const handleChange = (e : SelectChangeEvent) =>{
    setInventory({
        ...inventory,
        [e.target.name] : e.target.value
    })
  }
  const EditInventory = async () =>{
    let result = await axios.put("http://localhost:3001/edit/inventory/"+inventory.pro_id, inventory, config)
    if(result.data === "Success !"){
        swal("Finish", "แก้ไขข้อมูลสําเร็จ", "success")
        setIsOpen(false)
        setIsRefresh(true)
    }else{
        swal("Oops !", "เกิดข้อผิดพลาด", "danger")
        setIsOpen(false)
    }
  }
  const DeleteInventory = async () =>{
    let result = await axios.delete("http://localhost:3001/delete/inventory/"+inventory.pro_id, config)
    if(result.data === "Success !"){
        swal("Finish", "ลบข้อมูลสําเร็จ", "success")
        setIsOpen(false)
        setIsRefresh(true)
    }else{
        swal("Oops !", "เกิดข้อผิดพลาด", "error")
        setIsOpen(false)
    }
  }
  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Grid container direction={"column"} alignItems={"center"}>
            <Grid xs={12}>
              <h2>แก้ไขข้อมูลสินค้า</h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} style={{ display: "flex", flexDirection: "row" }}>
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
                value={inventory?.title}
              />
            </Grid>
            <Grid xs={6} style={{ display: "flex", flexDirection: "row" }}>
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
                value={!inventory?.brand ? '' : inventory?.brand}
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
                  value={inventory?.type}
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
                value={inventory?.total}
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
                value={inventory?.current_price_per}
              />
            </Grid>
          </Grid>
          <Grid container paddingTop={'1%'} direction={'column'} alignItems={'center'}>
            <Grid xs={12}>
                <Button variant="contained" color="error" onClick={DeleteInventory}>Delete</Button>
                <Button variant="contained" color="success" onClick={EditInventory}>แก้ไขข้อมูลสินค้า</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default EditInventoryModal;
