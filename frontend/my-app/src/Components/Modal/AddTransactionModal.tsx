import React,{useState, useEffect, ChangeEventHandler} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AddTransactionModalProps, SelectGroup} from "../../interfaces/Transaction";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { InventoryData } from "../../interfaces/Inventory";
import { Employees } from "../../interfaces/Employees";
import { Partners } from "../../interfaces/Partner";
import axios from "axios";
import { config } from "../../assets/Utils function/config";
import swal from 'sweetalert'

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpenAdd,
  setIsOpenAdd,
  setIsRefresh
}) => {
    useEffect(()=>{
        fetchAllInventory()
        fetchAllEmployees()
        fetchAllPartners()
    },[])
  const [productNameList, setProductNameList] = useState<InventoryData[]>()
  const [employeeList, setEmployeeList] = useState<Employees[]>()
  const [partnerList, setPartnerList] = useState<Partners[]>()
  const [productAddList, setProductAddList] = useState<{title:string, count:number}>({
    title : '',
    count : 0
  })
  const [listProduct, setListProduct] = useState<{title:string, count:number}[]>([])
  const [selectGroup, setSelectGroup] = useState<SelectGroup>({
    type : '',
    payment_method : '',
    payment_status : '',
    deliver_status : '',
    employee_emp_id : '',
    partner_par_id : '',
    transaction_date : new Date(),
    deliver_date : new Date(),
    credit_due_date : new Date(),
    credit : 0
  })
  const handleClose = () => setIsOpenAdd(false);
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
  const fetchAllInventory = async () =>{
    let result = await axios.get("http://localhost:3001/inventory", config)
    setProductNameList(result.data)
  }
  const fetchAllEmployees = async () =>{
    let result = await axios.get("http://localhost:3001/employees", config)
    setEmployeeList(result.data)
  }
  const fetchAllPartners = async () =>{
    let result = await axios.get("http://localhost:3001/partner", config)
    setPartnerList(result.data)
  }
  const AddProductToList = () =>{
    setListProduct(e => [...listProduct, productAddList])
  }
  const handleChange = (e : SelectChangeEvent) =>{
    setSelectGroup({
        ...selectGroup,
        [e.target.name] : e.target.value
    })
  }
  const handleChangeAddList = (e : SelectChangeEvent) =>{
    setProductAddList({
        ...productAddList,
        [e.target.name] : e.target.value
    })
  }

  const OndeleteListProduct = (indexDel: number) =>{
    let ListChange = listProduct.filter((item,index)=>{
        return index !== indexDel
    })
    setListProduct(ListChange)
  }
  const AddToTransaction = async () =>{
    if(!selectGroup.type || !selectGroup.payment_method || !selectGroup.payment_status || !selectGroup.deliver_status ||
        !selectGroup.employee_emp_id || !selectGroup.partner_par_id || !selectGroup.transaction_date || !selectGroup.deliver_date ||
        !selectGroup.credit_due_date || !selectGroup.credit){
            swal("Oops !", "กรุณากรอกข้อมูลให้ครบ", "warning")
    }else{
        let result = {
            type : selectGroup.type,
            payment_method : selectGroup.payment_method,
            payment_status : selectGroup.payment_status,
            delivery_status : parseInt(selectGroup.deliver_status),
            employee_emp_id : parseInt(selectGroup.employee_emp_id),
            partner_par_id : parseInt(selectGroup.partner_par_id),
            transaction_date : selectGroup.transaction_date,
            delivery_date : selectGroup.deliver_date,
            credit_due_date : selectGroup.credit_due_date,
            credit : selectGroup.credit,
            product : listProduct.map((item)=>{
                return {product_pro_id : parseInt(item.title.substring(0, item.title.indexOf(','))), 
                count : item.count, 
                price : parseInt(item.title.substring(item.title.indexOf('|')+1))*item.count
            }
            })
        }
        let add = await axios.post("http://localhost:3001/add/transaction",result,config)
        if(add.data === 'Add Finish !'){
            swal("Finish","เพิ่มธุรกรรมสําเร็จ","success")
            setIsOpenAdd(false)
            setIsRefresh(true)
        }else{
            swal("Oops!", "เกิดข้อผิดพลาด", "error")
            setIsOpenAdd(false)
        }
    }
  }
  return (
    <>
      <Modal open={isOpenAdd} onClose={handleClose}>
        <Box sx={style}>
          <Grid container direction={"column"} alignItems={"center"}>
            <Grid xs={12}>
              <h2>เพิ่มรายการธุรกรรม</h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ประเภท : </h4>
              <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectGroup?.type}
                  label="Age"
                  name="type"
                  onChange={handleChange}
                >
                  <MenuItem value={'SALE'}>ซื้อ</MenuItem>
                  <MenuItem value={'PURCHASE'}>ขาย</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} style={{ display: "flex", flexDirection: "row" }}>
              <h4>วันที่ดําเนินธุรกรรม : </h4>
              <input
                type="date"
                name="transaction_date"
                onChange={handleChange}
                style={{
                  width: "50%",
                  marginLeft: "3%",
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
              />
            </Grid>
          </Grid>
          <Grid container paddingTop={"1%"}>
            <Grid xs={6} style={{ display: "flex", flexDirection: "row" }}>
              <h4>ชื่อสินค้า :</h4>
              <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  name="title"
                  onChange={handleChangeAddList}
                >
                  {!!productNameList && productNameList?.map((item)=>(
                    <MenuItem key={item.pro_id} value={item.pro_id+','+item.title+'|'+item.current_price_per}>{item.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={5} style={{ display: "flex", flexDirection: "row" }}>
              <h4>จํานวนสินค้า :</h4>
              <input
                name="count"
                onChange={handleChangeAddList}
                style={{
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                type="number"
              />
            </Grid>
            <Grid xs={1}>
              <Button variant="contained" color="success" onClick={AddProductToList}>
                เพิ่ม
              </Button>
            </Grid>
            <Grid xs={12}>
              <Box style={{ backgroundColor: "white", borderRadius: 5 }}>
                <ul>
                    {listProduct?.map((item, index)=>(
                        <li key={index} style={{display:'flex', justifyContent:'space-between'}}>
                            <div>{item.title.substring(item.title.indexOf(',')+1,item.title.indexOf('|'))}</div>
                            <div>{' จํานวน '+item.count}</div>
                            <button onClick={()=>{OndeleteListProduct(index)}}>ลบ</button>
                        </li>
                    ))}
                </ul>
              </Box>
            </Grid>
            <Grid xs={3}>
              <h4>วิธีการชําระเงิน</h4>
              <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectGroup?.payment_method}
                  label="Age"
                  name="payment_method"
                  onChange={handleChange}
                >
                  <MenuItem value={'Cash'}>เงินสด</MenuItem>
                  <MenuItem value={'Cheque'}>เช็ค</MenuItem>
                  <MenuItem value={'Creditcard'}>บัตรเครดิต</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <h4>สถานะการชําระเงิน</h4>
              <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectGroup?.payment_status}
                  label="Age"
                  name="payment_status"
                  onChange={handleChange}
                >
                  <MenuItem value={'Complete'}>ชําระครบถ้วน</MenuItem>
                  <MenuItem value={'Incomplete'}>ยังชําระไม่ครบ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <h4>ยอดการสั่งซื้อ(บาท)</h4>
              <Box
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: "5%",
                }}
              >
                {listProduct.reduce((acc,current)=>acc + parseInt(current.title.substring(current.title.indexOf("|")+1))*current.count,0)}
              </Box>
            </Grid>
            <Grid xs={3} style={{ paddingLeft: "3%" }}>
              <h4>ยอดค้างชําระ(บาท)</h4>
              <input
                onChange={handleChange}
                name="credit"
                style={{
                  borderRadius: 5,
                  padding: "5%",
                  border: "1px solid white",
                }}
                type="number"
              />
            </Grid>
            <Grid container paddingTop={"1%"}>
              <Grid xs={6}>
                <h4>สถานะการจัดส่ง</h4>
                <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Please Select
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectGroup?.deliver_status}
                    label="Age"
                    name="deliver_status"
                    onChange={handleChange}
                  >
                    <MenuItem value={'1'}>จัดส่งสําเร็จ</MenuItem>
                    <MenuItem value={'0'}>ยังไม่จัดส่ง</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <h4>วันที่จัดส่งสินค้า</h4>
                <input
                  type="date"
                  name="deliver_date"
                  onChange={handleChange}
                  style={{
                    width: "50%",
                    marginLeft: "3%",
                    borderRadius: 5,
                    padding: "5%",
                    border: "1px solid white",
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <h4>พนักงานผู้ดําเนินการ</h4>
                <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Please Select
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectGroup?.employee_emp_id}
                    label="Age"
                    name="employee_emp_id"
                    onChange={handleChange}
                  >
                    {!!employeeList && employeeList?.map((item)=>(
                        <MenuItem key={item.emp_id} value={item.emp_id}>{item.fname+' '+item.lname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <h4>คู่ค้าที่ทําธุรกรรม</h4>
                <FormControl style={{ width: "50%", marginLeft: "3%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Please Select
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectGroup?.partner_par_id}
                    label="Age"
                    name="partner_par_id"
                    onChange={handleChange}
                  >
                    {!!partnerList && partnerList?.map((item)=>(
                        <MenuItem key={item.par_id} value={item.par_id}>{item.par_fname+' '+item.par_lname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <h4>วันที่ครบกําหนดชําระ</h4>
                <input
                  type="date"
                  name="credit_due_date"
                  onChange={handleChange}
                  style={{
                    width: "50%",
                    marginLeft: "3%",
                    borderRadius: 5,
                    padding: "5%",
                    border: "1px solid white",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          paddingTop={'2%'}>
            <Grid xs={12}>
                <Button variant="contained" color="success" onClick={AddToTransaction}>เพิ่มรายการธุรกรรม</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
