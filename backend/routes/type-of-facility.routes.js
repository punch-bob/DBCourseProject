const Router = require('express')
const router = Router()
const typeOfFacilityController = require('../controller/type-of-facility.controller')

router.get('/types-of-facility', typeOfFacilityController.getTypesOfFacility)
router.post('/type-of-facility', typeOfFacilityController.createTypeOfFacility)
router.put('/type-of-facility', typeOfFacilityController.updateTypeOfFacility)
router.delete('/type-of-facility/:id', typeOfFacilityController.deleteTypeOfFacility)

module.exports  = router