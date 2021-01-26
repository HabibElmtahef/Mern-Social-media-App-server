const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')


const UserController = {
    signUp: (req, res) => {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            res.status(422).json({error: "please add all the fields"})
        }
        User.findOne({email: email}).then((savedUser) => {
            if(savedUser){
                res.status(422).json({error: "this email already exist"})
            }
            else{
            bcrypt.hash(password, 12).then(hashedPassword => {
                const newUser = new User({
                name,
                email,
                password: hashedPassword
            })
            newUser.save().then(newUser => {
                res.json({message: "succesfly posted"})
            }).catch(err => {
                console.log(err)
            })

            })

            }
            
        })
    },
    signIn: (req, res) => {
        const {email, password} = req.body
        if(!email || !password){
            res.status(422).json({error: "please add all the fields"})
        }
        User.findOne({email: email}).then(savedUser => {
            if(!savedUser){
                res.status(422).json({error: "Invalid Email or Password"})
            }
            else{
                bcrypt.compare(password, savedUser.password).then(doMatch => {
                    if(doMatch){
                        //res.json({message: "Successfully Signed In"})
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                        const{_id, name, email} = savedUser
                        res.json({token, user: _id, name, email})
                    }
                    else{
                        res.status(422).json({error: "Invalid Password"})
                    }
                }).catch(err =>{
                    console.log(err)
                })
            }
        })
    }
}
 
module.exports = UserController