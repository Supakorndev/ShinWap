const { isLoggedIn } = require('../middlewares')
const express = require("express")
const router = express.Router();
const {loginAuthen} = require('../service/loginService')

router.post('/user/login', async (req, res, next) => {
    await loginAuthen(req, res, next)
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

exports.router = router