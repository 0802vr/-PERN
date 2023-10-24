const Router = require ('express')
const checkRole = require('../middleware/checkMiddleWare')
const router = new Router()
const typeController = require('../controllers/typeControllers')
router.post('/', checkRole('ADMIN'),  typeController.create)
router.get('/', typeController.getAll)



module.exports = router