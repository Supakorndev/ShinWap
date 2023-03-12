const express = require("express")
const router = express.Router();
const {isLoggedIn, isAdmin} = require('../middlewares/index')
const {getAllInventory, addInventory, editInventoryById, deleteInventoryById} = require("../service/inventoryService")

router.get("/inventory", isLoggedIn, async (req, res, next)=>{
    await getAllInventory(req, res, next)
})

router.post("/add/inventory", isLoggedIn ,isAdmin, async (req, res, next)=>{
    await addInventory(req, res, next)
})

router.put("/edit/inventory/:id", isLoggedIn ,isAdmin, async (req, res, next)=>{
    await editInventoryById(req, res, next)
})

router.delete("/delete/inventory/:id", isLoggedIn ,isAdmin, async (req, res, next)=>{
    await deleteInventoryById(req, res, next)
})

exports.router = router