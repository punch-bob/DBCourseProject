const Router = require('express')
const router = Router()
const competitionController = require('../controller/competition.controller')

router.get('/competitions', competitionController.getCompetitions)
router.post('/competition', competitionController.createCompetition)
router.put('/competition', competitionController.updateCompetition)
router.delete('/competition/:id', competitionController.deleteCompetition)

module.exports  = router