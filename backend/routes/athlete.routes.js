const Router = require('express')
const router = Router()
const athleteController = require('../controller/athlete.controller')

router.get('/athletes', athleteController.getAthletes)
router.post('/athlete', athleteController.createAthlete)
router.put('/athlete', athleteController.updateAthlete)
router.delete('/athlete/:id', athleteController.deleteAthlete)

module.exports  = router