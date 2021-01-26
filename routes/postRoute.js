const router = require('express').Router()
const PostController = require('../controllers/postController')
const requireLogin = require('../middleware/requireLogin')

router.get('/', (req, res) => {
    res.json({msg: "Post Route Rah Khedam"})
})
router.post('/create', requireLogin, PostController.createPost)
router.get('/all', PostController.getAllPosts)
router.get('/myposts', requireLogin, PostController.getUserPosts)

module.exports = router