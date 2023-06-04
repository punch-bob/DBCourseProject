const Router = require('express')
const router = Router()
const sportsFacilityController = require('../controller/sports-facility.controller')

router.get('/sports-facilities', sportsFacilityController.getSportsFacilities)
router.post('/sports-facility', sportsFacilityController.createSportsFacility)
router.put('/sports-facility', sportsFacilityController.updateSportsFacility)
router.delete('/sports-facility/:id', sportsFacilityController.deleteSportsFacility)

module.exports  = router