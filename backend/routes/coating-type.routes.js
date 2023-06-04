const Router = require('express')
const router = Router()
const coatingTypeController = require('../controller/coating-type.controller')

router.get('/coating-types', coatingTypeController.getCoatingTypes)
router.post('/coating-type', coatingTypeController.createCoatingType)
router.put('/coating-type', coatingTypeController.updateCoatingType)
router.delete('/coating-type/:id', coatingTypeController.deleteCoatingType)

module.exports  = router