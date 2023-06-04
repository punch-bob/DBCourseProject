const Router = require('express')
const router = Router()
const athleteSportController = require('../controller/athlete-sport.controller')

router.get('/athlete-sport', athleteSportController.getAthleteSport)
router.post('/athlete-sport', athleteSportController.createAthleteSport)
router.put('/athlete-sport', athleteSportController.updateAthleteSport)
router.delete('/athlete-sport/:id', athleteSportController.deleteAthleteSport)

module.exports  = router