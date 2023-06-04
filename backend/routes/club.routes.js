const Router = require('express')
const router = Router()
const clubController = require('../controller/club.controller')

router.get('/clubs', clubController.getClubs)
router.post('/club', clubController.createClub)
router.put('/club', clubController.updateClub)
router.delete('/club/:id', clubController.deleteClub)

module.exports  = router