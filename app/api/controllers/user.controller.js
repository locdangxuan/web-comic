const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const { registerValidation, loginValidation } = require('../validation')

module.exports = {
    register: async (req, res, next) => {

        //<----------------validate data before user----------------->
        const { error } = registerValidation(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }

        //<-------checking email and username is already exist in database------>
        const emailExist = await UserModel.findOne({ email: req.body.email });
        const userExist = await UserModel.findOne({ username: req.body.username });
        if(emailExist) 
        	return res.status(400).send("Email already exist");
        if(userExist)
        	return res.status(400).send("Username already exist");

        //<-------------------hashed password------------------------>
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //<-------------------Create a user-------------------------->
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            date: req.body.date
        });
        try {
            const saveUser = await user.save();
            res.send(saveUser);
        } catch (err) {
            res.status(400).send(err);
        };
    },

    login: async (req, res, next) => {

    	//<--------------checking username valid-------------------->
    	const validUsername = await UserModel.findOne({username: req.body.username});
    	if(!validUsername) return res.status(400).send("wrong username");

    	//<--------------checking password valid-------------------->
    	const validPassword = await bcrypt.compare(req.body.password, validUsername.password);
        if(!validPassword) return res.status(400).send('Invalid password');

        //<..............create a sign token------------------------->
        
        res.send('success');
    }
}