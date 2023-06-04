const Router = require('express')
const router = Router()
const competitionOrganizerController = require('../controller/competition-organizer.controller')

router.get('/competition-organizer', competitionOrganizerController.getCompetitionOrganizer)
router.post('/competition-organizer', competitionOrganizerController.createCompetitionOrganizer)
router.put('/competition-organizer', competitionOrganizerController.updateCompetitionOrganizer)
router.delete('/competition-organizer/:id', competitionOrganizerController.deleteCompetitionOrganizer)

module.exports  = router