const Router = require('express')
const router = Router()
const sportController = require('../controller/sport.controller')

router.get('/sports', sportController.getSports)
router.post('/sport', sportController.createSport)
router.put('/sport', sportController.updateSport)
router.delete('/sport/:id', sportController.deleteSport)

module.exports  = router