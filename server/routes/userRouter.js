const Router = require ('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleWare = require('../middleware/authMiddleWare')
router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', authMiddleWare,  userControllers.check)



module.exports = router