const router = require('express').Router()
const PostsController =  require('../controllers/posts_controllers')
const TagsController = require('../controllers/tags_controller')
const multer = require("../config/multer_config")

router.post('/createPost' , multer.upload.single('image'), PostsController.createPosts)
router.post('/createTag', TagsController.createTag)
router.get('/getAllPosts' , PostsController.getAllPosts)
module.exports  = router