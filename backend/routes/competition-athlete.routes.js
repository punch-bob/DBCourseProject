const Router = require('express')
const router = Router()
const competitionAthleteController = require('../controller/competition-athlete.controller')

router.get('/competition-athlete', competitionAthleteController.getCompetitionAthlete)
router.post('/competition-athlete', competitionAthleteController.createCompetitionAthlete)
router.put('/competition-athlete', competitionAthleteController.updateCompetitionAthlete)
router.delete('/competition-athlete/:id', competitionAthleteController.deleteCompetitionAthlete)

module.exports  = router