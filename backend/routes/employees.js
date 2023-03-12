const express = require("express")
const router = express.Router();
const multer = require('multer')
const path = require("path")
const {getAllEmp, getEmpById, addEmp, deleteEmpById, editEmpById} = require('../service/employeeService')
const {isLoggedIn, isAdmin} = require('../middlewares/index')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './static/images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.get("/employees", isLoggedIn, async function(req, res, next) {
    await getAllEmp(req, res, next)
});

router.get("/employees/:id", isLoggedIn, async function(req, res, next) {
    await getEmpById(req, res, next)
});

router.post("/employees", upload.single('imageEmp'), async function(req, res, next) {
    await addEmp(req, res, next)
});

router.delete("/employees/:id", isLoggedIn, isAdmin, async function(req, res, next) {
    await deleteEmpById(req, res, next)
});

router.put("/employees/:id", isLoggedIn, isAdmin, upload.single('imageEmp'),  async function(req, res, next) {
    await editEmpById(req, res, next)
});

exports.router = router