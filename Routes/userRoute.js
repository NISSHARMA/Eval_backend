const express = require("express")
const userRoute = express.Router()
const { UserModel } = require("../Model/userModel")
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

userRoute.post("/register", async (req, res) => {
    const { email, name, gender, password, age, city, is_married } = req.body
    const User_email = await UserModel.find({ email: email })
    
    try {
       
        /*if (User_email[0].email == email) {
            res.status(200).send("User already exist, please login")
        } else {*/
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = new UserModel({ email, name, gender, password: hash, age, city, is_married })
                await newUser.save()
                res.status(200).send({ "msg": "User has been registered" })
            })
        //}
    } catch (err) {
        res.status(400).send({ "msg": err.msg })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successfull", "token": jwt.sign({ "userID": user._id }, 'Evaluation') })
                } else {
                    res.status(400).send({ "msg": "Wrong Credential" })
                }
            })
        }
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})

module.exports = {
    userRoute
}