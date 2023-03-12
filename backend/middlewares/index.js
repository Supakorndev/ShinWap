const pool = require("../config");

async function isLoggedIn(req, res, next) {
  let authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send("You are not logged in");
  }

  let [part1, part2] = authorization.split(" ");
  if (part1 !== "Bearer" || !part2) {
    return res.status(401).send("You are not logged in");
  }

  // Check token
  const [tokens] = await pool.query("SELECT * FROM tokens WHERE token = ?", [
    part2,
  ]);
  const token = tokens[0];
  if (!token) {
    return res.status(401).send("You are not logged in");
  }

  const [users] = await pool.query('SELECT emp_id, username, fname, lname, email, phone, role ' +'FROM employee WHERE emp_id = ?', [token.user_id])
  req.user = users[0]
  next()
}

const isAdmin = async (req, res, next) => {
  if (req.user.role === 'admin'){
    return next()
  }
  else {
    return res.status(403).send('You do not have permission to perform this action')
  }

  next()
}

module.exports = {
  isLoggedIn,
  isAdmin
};
