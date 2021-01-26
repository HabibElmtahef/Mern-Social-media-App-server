const Post = require('../models/post')

const PostController = {
    createPost: (req, res) => {
        const {title, body} = req.body
        if(!title || !body){
            return res.status(422).json({error: "please add all the fields"})
        }
        const post = new Post({
            title,
            body,
            postedBy: req.user
        })
        post.save().then(result => {
            res.json({post: result})
        }).catch(err => {
            console.log(err)
        })
    },
    getAllPosts: (req, res) => {
        Post.find().populate("postedBy", "_id name").then(posts => {
            res.json({posts})
        }).catch(err => {
            console.log(err)
        })
    },
    getUserPosts: (req, res) => {
        Post.find({postedBy: req.user._id}).then(myPosts => {
            res.json({myPosts})
        }).catch(err =>{
            console.log(err)
        })
    }
}

module.exports = PostController