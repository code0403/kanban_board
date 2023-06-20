const express = require("express")
const UserRouter = express.Router()
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

UserRouter.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    try {
       bcrypt.hash(password, 5, async(err, hash) => {
         
        console.log({password:hash})
        const user = new UserModel({email:email, password:hash})
        await user.save()
        res.status(200).send({"msg" : "Registration is Successful"})
       }) 
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg" : "Registration is Unsuccessful!!!"}) 
    }
})



UserRouter.post("/signin", async(req, res) => {

    const { email, password } = req.body;

    try {
        const UserData = await UserModel.find({email:email});
        console.log(UserData[0])

        if(UserData.length >= 0){
            bcrypt.compare(password, UserData[0].password, (err, result) => {
                if(result){
                    res.status(200).send({"msg" : "Login is Successful.", "token": jwt.sign({"userID": UserData[0]._id}, process.env.SECRET_KEY)})
                } else {
                    res.status(401).send({"msg": "Invalid Credentials"});
                }
            })
        }
    } catch (error) {
      res.status(400).send({"msg" : error.message})  
    }

})


module.exports = { UserRouter };