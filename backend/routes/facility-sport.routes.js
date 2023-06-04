const Router = require('express')
const router = Router()
const facilitySportController = require('../controller/facility-sport.controller')

router.get('/facility-sport', facilitySportController.getFacilitySport)
router.post('/facility-sport', facilitySportController.createFacilitySport)
router.put('/facility-sport', facilitySportController.updateFacilitySport)
router.delete('/facility-sport/:id', facilitySportController.deleteFacilitySport)

module.exports  = router