const Router = require('express')
const router = Router()
const athleteClubController = require('../controller/athlete-club.controller')

router.get('/athlete-club', athleteClubController.getAthleteClub)
router.post('/athlete-club', athleteClubController.createAthleteClub)
router.put('/athlete-club', athleteClubController.updateAthleteClub)
router.delete('/athlete-club/:id', athleteClubController.deleteAthleteClub)

module.exports  = router