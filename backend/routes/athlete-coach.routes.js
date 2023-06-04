const Router = require('express')
const router = Router()
const athleteCoachController = require('../controller/athlete-coach.controller')

router.get('/athlete-coach', athleteCoachController.getAthleteCoach)
router.post('/athlete-coach', athleteCoachController.createAthleteCoach)
router.put('/athlete-coach', athleteCoachController.updateAthleteCoach)
router.delete('/athlete-coach/:id', athleteCoachController.deleteAthleteCoach)

module.exports  = router