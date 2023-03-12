const pool = require("../config");

const getAllEmp = async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  let search = req.query.search || "";
  try {
    if (search.length > 0) {
      let sql = "SELECT * FROM employee WHERE fname LIKE ? OR lname LIKE ?";
      let cond = [`%${search}%`, `%${search}%`];
      let info = await pool.query(sql, cond);
      res.send(info[0])
    } else {
      let info = await conn.query("SELECT * FROM employee");
      console.log(info[0][0].citizen_id);
      conn.commit();
      res.send(info[0])
    }
  } catch (err) {
    await conn.rollback();
    return next(err);
  } finally {
    console.log("*-----END-----*");
    conn.release();
  }
};

const getEmpById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM employee WHERE emp_id = ?", [req.params.id])
        conn.commit()
        res.send(info[0][0]);
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
}

const addEmp = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let {citizen, degree, dob, position, salary, address, email, phone, fname, lname, gender, password} = req.body
    let imageEmp = req.file.filename
       
    try {
        await conn.query(`
        INSERT INTO employee(citizen_id, degree, dob, position, salary, address, email, phone, fname, lname, gender, password, role, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [citizen, degree, dob, position, salary, address, email, phone, fname, lname, gender, password, 'user', imageEmp])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
}

const deleteEmpById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let edit = await conn.query('DELETE FROM employee WHERE emp_id = ?', [req.params.id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
}

const editEmpById = async (req, res, next) =>{
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let {degree, position, salary, address, email, phone, fname, lname} = req.body
    try {
        await conn.query(`
        UPDATE employee 
        SET degree = ?,
            position = ?,
            salary = ?,
            address = ?,
            email = ?,
            phone = ?,
            fname = ?,
            lname = ? 
        WHERE emp_id = ?`,[degree, position, salary, address, email, phone, fname, lname, req.params.id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
}

module.exports = {
    getAllEmp,
    getEmpById,
    addEmp,
    deleteEmpById,
    editEmpById
}
