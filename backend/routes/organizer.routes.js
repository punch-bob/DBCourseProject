const Router = require('express')
const router = Router()
const organizerController = require('../controller/organizer.controller')

router.get('/organizers', organizerController.getOrganizers)
router.post('/organizer', organizerController.createOrganizer)
router.put('/organizer', organizerController.updateOrganizer)
router.delete('/organizer/:id', organizerController.deleteOrganizer)

module.exports  = router