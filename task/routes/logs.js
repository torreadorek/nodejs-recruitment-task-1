const router = require('express').Router()
const controller = require('../controllers/logs')
const validation = require('../utils/validation')
const {token,getLogsByTimestamp,getLogsByUUID} = require('../utils/schema')

router.get('/logs',validation.headers(token),validation.query(getLogsByTimestamp),controller.getLogsByTimestamp)
router.get('/logs/:uuid',validation.headers(token),validation.params(getLogsByUUID),controller.getLogsByUUID)

module.exports = router