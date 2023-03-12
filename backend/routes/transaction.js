const express = require('express')
const router = express.Router()
const {isLoggedIn, isAdmin} = require("../middlewares/index")
const {getAllTransaction, getTransactionById, deleteTransactionById, addTransaction, editTransactioById} = require("../service/transactionService")

router.get("/transaction", isLoggedIn, async (req, res, next)=>{
    await getAllTransaction(req, res, next)
})

router.get("/transaction/:id", isLoggedIn, async (req, res, next)=>{
    await getTransactionById(req, res, next)
})

router.post("/add/transaction", isLoggedIn, isAdmin, async (req, res, next)=>{
    await addTransaction(req, res, next)
})

router.put("/edit/transaction/:id", isLoggedIn, isAdmin, async (req, res, next)=>{
    await editTransactioById(req, res, next)
})

router.delete("/delete/transaction/:id", isLoggedIn, isAdmin, async (req, res, next)=>{
    await deleteTransactionById(req, res, next)
})

exports.router = router