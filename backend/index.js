const express = require("express")
const app = express()
var cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const loginRouter = require('./routes/login')
const employeeRouter = require('./routes/employees')
const inventoryRouter = require('./routes/inventory')
const transactionRouter = require('./routes/transaction')
const partnerRouter = require("./routes/partners")

app.use(loginRouter.router)
app.use(employeeRouter.router)
app.use(inventoryRouter.router)
app.use(transactionRouter.router)
app.use(partnerRouter.router)

app.listen(3001, () => {
    console.log(`Example app listening at http://localhost:3001`)
})