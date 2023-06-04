const Router = require('express')
const router = Router()
const attributeController = require('../controller/attribute.controller')

router.get('/attributes', attributeController.getAttributes)
router.post('/attribute', attributeController.createAttribute)
router.put('/attribute', attributeController.updateAttribute)
router.delete('/attribute/:id', attributeController.deleteAttribute)

module.exports  = router