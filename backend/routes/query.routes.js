const Router = require('express')
const router = Router()
const queryController = require('../controller/query.controller')

router.post('/facility-by-filter', queryController.getFacilityByFilter)
router.post('/facility-by-period', queryController.getFacilityByPeriod)
router.post('/athlete-by-sport-rank', queryController.getAthleteBySportRank)
router.post('/athlete-by-coach-rank', queryController.getAthleteByCoachRank)
router.post('/athlete-by-numb-of-sports', queryController.getAthleteByNumbOfSport)
router.post('/athlete-by-period', queryController.getAthleteByPeriod)
router.post('/club-by-period', queryController.getClubByPeriod)
router.post('/comp-by-period-org', queryController.getCompByPeriodOrg)
router.post('/comp-by-facility-sport', queryController.getCompByFacilitySport)
router.post('/org-by-period', queryController.getOrgByPeriod)
router.get('/comp-top/:id', queryController.getCompTop)
router.get('/coach-by-athlete/:id', queryController.getCoachByAthlete)
router.get('/coach-by-sport/:id', queryController.getCoachBySport)

module.exports  = router