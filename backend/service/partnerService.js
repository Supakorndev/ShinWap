const pool = require("../config")

const getAllPartner = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let result = await conn.query("SELECT * FROM partner")
        conn.commit()
        res.send(result[0])
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const getPartnerById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let result = await conn.query("SELECT * FROM partner WHERE par_id = ?", [req.params.id])
        conn.commit()
        res.send(result[0])
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const addPartner = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let {delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2,
            description} = req.body
        let imagePar = req.file.filename
        await conn.query(`INSERT INTO partner(delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2,
            description, photo) VALUES(?,?,?,?,?,?,?,?,?,?,?)`, [delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2,
                description,imagePar])
        conn.commit()
        res.send("Finish !")
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const editPartnerById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        let {delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2,
            description} = req.body
        let imagePar = req.file.filename
        await conn.query(`UPDATE partner SET delivery_address = ?, company_name = ?, par_fname = ?, par_lname = ?, legal_address = ?,
        type = ?, email1 = ?, email2 = ?, phone1 = ?, phone2 = ?, description = ?, photo = ? WHERE par_id = ?`, [delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2,
        description, imagePar, req.params.id])
        conn.commit()
        res.send("Edit Finish !")
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

const deletePartnerById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM partner WHERE par_id = ?", [req.params.id])
        conn.commit()
        res.send("Delete Finish !")
    }catch(err){
        await conn.rollback()
        return next(err)
    }finally{
        console.log("finally")
        await conn.release()
    }
}

module.exports = {getAllPartner, getPartnerById, addPartner, editPartnerById, deletePartnerById}