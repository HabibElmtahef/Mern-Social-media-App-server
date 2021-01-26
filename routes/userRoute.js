const router = require('express').Router()
const UserController = require('../controllers/userController')
const requireLogin = require('../middleware/requireLogin')

router.get('/', requireLogin ,(req, res) => {
    res.json({msg: 'User Router Rah khedam'})
})

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)

module.exports = router