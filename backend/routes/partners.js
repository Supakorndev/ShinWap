const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require("path")
const {isLoggedIn, isAdmin} = require("../middlewares/index")
const {getAllPartner, getPartnerById, addPartner, editPartnerById, deletePartnerById} = require("../service/partnerService")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './static/images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.get("/partner", isLoggedIn ,async(req, res, next)=>{
    await getAllPartner(req, res, next)
})

router.get("/partner/:id", isLoggedIn, async(req, res, next)=>{
    await getPartnerById(req, res, next)
})

router.post("/add/partner", isLoggedIn, isAdmin, upload.single("photoPar"), async(req, res, next)=>{
    await addPartner(req, res, next)
})

router.put("edit/partner/:id", isLoggedIn, isAdmin, async(req, res, next)=>{
    await editPartnerById(req, res, next)
})

router.delete("/delete/partner/:id", isLoggedIn, isAdmin, async(req, res, next)=>{
    await deletePartnerById(req, res, next)
})

exports.router = router