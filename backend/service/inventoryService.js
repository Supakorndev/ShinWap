const pool = require("../config");
const moment = require('moment')

const getAllInventory = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction
    try{
        let [result] = await conn.query("SELECT * FROM product")
        conn.commit()
        res.send(result)
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}

const addInventory = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let {title, mfd, brand, type, total, current_price_per} = req.body
        await conn.query("INSERT INTO product(title, mfd, brand, type, total, current_price_per) VALUES(?,?,?,?,?,?)", [title, moment(mfd).format("YYYY-MM-DD hh:mm:ss"), brand, type, total, current_price_per])
        conn.commit()
        res.send("Success !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const editInventoryById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        console.log(req.body)
        let {title, mfd, brand, type, total, current_price_per} = req.body
        await conn.query("UPDATE product SET title = ?, mfd = ?, brand = ?, type = ?, total = ?, current_price_per = ? WHERE pro_id = ?",
        [title, moment(mfd).format("YYYY-MM-DD hh:mm:ss"), brand, type, total, current_price_per , req.params.id])
        conn.commit()
        res.send("Success !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const deleteInventoryById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM product WHERE pro_id = ?",[req.params.id])
        conn.commit()
        res.send("Success !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

module.exports = {getAllInventory, addInventory, editInventoryById, deleteInventoryById}