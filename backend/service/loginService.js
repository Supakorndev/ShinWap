const jwt = require("jsonwebtoken")
const pool = require("../config")

const loginAuthen = async (req, res, next)=>{
    const email = req.body.email
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [users] = await conn.query('SELECT * FROM employee WHERE email=?', [email])
        const user = users[0]
        if (!user){
            throw new Error('Incorrect email or password')
        }
        if (password != user.password){
            throw new Error('Incorrect email or password')
        }
        const [tokens] = await conn.query('SELECT * FROM tokens WHERE user_id=?', [user.emp_id])
        let token = tokens[0]?.token
        let newToken = jwt.sign(
            {id: user.emp_id, email, password},
            process.env.JWT_KEY,
            {expiresIn : "2h"}
        )
        if (!token){
            await conn.query('INSERT INTO tokens(user_id, token) VALUES (?, ?)', [user.emp_id, newToken])
        }else{
            await conn.query('UPDATE tokens SET token = ? WHERE user_id = ?', [newToken, user.emp_id])
        }
        conn.commit()
        res.status(200).json({'token': newToken})
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }
}

module.exports = {loginAuthen}