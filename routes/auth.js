const router = require('express').Router()
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')
const AES = require('crypto-js/aes')
const jwt = require('jsonwebtoken')


//REGISTER
router.post('/register', async (req, res) => {

    
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            //PASSWORD SHOULD BE HASHED!!
            // const password = 
            password: CryptoJS.AES.encrypt(
                req.body.password, process.env.PASS_SEC).toString()
            // password: req.body.password
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json(err)
    }

})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        
        const user = await User.findOne({username: req.body.username})
        if(!user) {
            return res.status(401).json("wrong credentials!")
        }

        // Decrypt
        const bytes  = CryptoJS.AES.decrypt( user.password, process.env.PASS_SEC);
        const originalpassword = bytes.toString(CryptoJS.enc.Utf8);

        if(originalpassword != req.body.password) {
            return res.status(401).json("wrong credentials!")
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        )

        //destructuring using spread operator
        const {password, ...others} = user._doc;

        res.status(201).json({...others, accessToken})

    } catch (err) {
        res.status(500).json(err)
    }


})


module.exports = router

