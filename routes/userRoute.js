const User = require('../models/userModel')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmn } = require('./verifyToken')

const router = require('express').Router()

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(500).json(err)
    }  
})

//DELETE
router.delete('/:id', verifyTokenAndAdmn, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json('User has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER
router.get('/find/:id', verifyTokenAndAdmn, async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
         //destructuring using spread operator
         const {password, ...others} = user._doc;

         res.status(201).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USER
router.get('/', verifyTokenAndAdmn, async (req, res) => {
    const query = req.query.new
    try{
        const users = query ? await User.find().limit(5) : await User.find()
         //destructuring using spread operator
        //  const {password, ...others} = users._doc;

        //  res.status(201).json(others)
         res.status(201).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET USER STATS
// 1:17:00 vid timestamp
// router.get('/stats', verifyTokenAndAdmn, async (req, res) => {
    
// })



module.exports = router