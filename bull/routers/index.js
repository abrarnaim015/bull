const routers = require('express').Router()
const BullTestController = require('../controller/bull_test-controller')

routers.get('/bulls', BullTestController.getBullTest)
routers.post('/bulls', BullTestController.postBullTest)
routers.delete('/bulls', BullTestController.deleteManyBullTest)
routers.delete('/bulls/:id', BullTestController.deleteBullTest)

module.exports = routers