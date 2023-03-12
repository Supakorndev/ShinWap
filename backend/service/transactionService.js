const pool = require("../config")

const getAllTransaction = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let result = await conn.query("SELECT * from transaction")
        conn.commit()
        res.send(result[0])
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}

const getTransactionById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let result = await conn.query(`select ptr.product_pro_id, ptr.transaction_tran_id, ptr.price, ptr.count, 
        p.title, p.mfd, p.brand, em.fname, em.lname, pn.par_fname, pn.par_lname from product_transaction ptr
        inner join product p on ptr.product_pro_id = p.pro_id
        inner join transaction t on t.tran_id = ptr.transaction_tran_id
        inner join employee em on em.emp_id = t.employee_emp_id
        inner join partner pn on pn.par_id = t.partner_par_id where ptr.transaction_tran_id = ?
        `,[req.params.id])
        conn.commit()
        res.send(result[0])
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}

const deleteTransactionById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM product_transaction WHERE transaction_tran_id = ?", [req.params.id])
        await conn.query("DELETE FROM transaction WHERE tran_id = ?", [req.params.id])
        conn.commit()
        res.send("Delete Finish !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}

const addTransaction = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let {delivery_date, credit, payment_method, payment_status, credit_due_date, transaction_date, delivery_status,
            type, employee_emp_id, partner_par_id, product} = req.body
        let result = await conn.query(`INSERT INTO transaction(delivery_date, credit, payment_method, payment_status, credit_due_date, transaction_date, delivery_status,
            type, employee_emp_id, partner_par_id) VALUES(?,?,?,?,?,?,?,?,?,?)`, 
            [delivery_date, credit, payment_method, payment_status, credit_due_date, transaction_date, delivery_status,
                type, employee_emp_id, partner_par_id])
        for(let i=0;i<product.length;i++){
            await conn.query("INSERT INTO product_transaction(product_pro_id, transaction_tran_id, price, count) VALUES(?,?,?,?)", 
            [product[i].product_pro_id, result[0].insertId, product[i].price, product[i].count])
        }
        conn.commit()
        res.send("Add Finish !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}

const editTransactioById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let {delivery_date, credit, payment_method, payment_status, credit_due_date, transaction_date, delivery_status,
            type, employee_emp_id, partner_par_id, product} = req.body
        await conn.query(`UPDATE transaction SET delivery_date = ?, credit = ?, payment_method = ?, payment_status = ?,
        credit_due_date = ?, transaction_date = ?, delivery_status = ?, type = ?, employee_emp_id = ?, partner_par_id = ?
        WHERE tran_id = ?`, [delivery_date, credit, payment_method, payment_status, credit_due_date, transaction_date, delivery_status,
        type, employee_emp_id, partner_par_id, req.params.id])
        for(let i=0;i<product.length;i++){
            if(product[i].isDelete === true){
                await conn.query("DELETE FROM product_transaction WHERE product_pro_id = ? and transaction_tran_id = ?", [product[i].product_pro_id, req.params.id])
            }else{
                await conn.query("UPDATE product_transaction SET product_pro_id = ?, price = ?, count = ?", [product[i].product_pro_id, product[i].price, product[i].count])
            }
        }
        conn.commit()
        res.send("Edit Finish !")
    }catch(err){
        res.send("Fail")
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        conn.release()
    }
}
module.exports = {getAllTransaction, getTransactionById, deleteTransactionById, addTransaction, editTransactioById}