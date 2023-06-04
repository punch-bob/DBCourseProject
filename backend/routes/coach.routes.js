const Router = require('express')
const router = Router()
const coachController = require('../controller/coach.controller')

router.get('/coaches', coachController.getCoaches)
router.post('/coach', coachController.createCoach)
router.put('/coach', coachController.updateCoach)
router.delete('/coach/:id', coachController.deleteCoach)

module.exports  = router