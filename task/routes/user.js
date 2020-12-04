const router = require('express').Router()
const controller = require('../controllers/user')
const validation = require('../utils/validation')
const {token,addUser} = require('../utils/schema')

router.post('/users',validation.headers(token),validation.body(addUser),controller.addUser) 

module.exports = router