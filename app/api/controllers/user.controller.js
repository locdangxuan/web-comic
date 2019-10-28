const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const UserModel = require('../models/user.model');
const { registerValidation, loginValidation, updateInfoValidation, updatePasswordValidation } = require('../validation');

module.exports = {
    register: async (req, res, next) => {
        //<----------------validate data before being a user----------------->
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details[0].message);
        }

        //<-------checking email and username is already exist in database------>
        const emailExist = await UserModel.findOne({ email: req.body.email });
        const userExist = await UserModel.findOne({ username: req.body.username });
        if (emailExist)
            return res.status(httpStatus.BAD_REQUEST).send("Email already exist");
        if (userExist)
            return res.status(httpStatus.BAD_REQUEST).send("Username already exist");

        //<-------------------hashed password------------------------>
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //<-------------------Create a user-------------------------->
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            date: req.body.date
        });
        try {
            //<-------------------save user to database------------------------->
            await user.save();
            res.send("User successfully created!");
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        };
    },

    login: async (req, res, next) => {
        try {
            //<--------------checking username valid-------------------->
            const user = await UserModel.findOne({ username: req.body.username });
            if (!user)
                return res.status(httpStatus.UNAUTHORIZED).send("wrong username");

            //<--------------checking password valid-------------------->
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword)
                return res.status(httpStatus.UNAUTHORIZED).send('Invalid password');

            //<..............create a sign token to login------------------------->
            const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

            //<-----save token when logged in and save to database-------------->
            user.token = token;
            await user.save();
            res.send('login successfully!');
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }

    },

    logout: async (req, res, next) => {
        try {
            //<-----------------remove token when user logout---------------------->
            const user = await UserModel.findOne({ username: req.body.username });
            user.token = null;
            await user.save();
            return res.send('logout successfully!');
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }

    },

    update: async (req, res, next) => {
        try {
            //<----------------validate data before updating----------------->
            const { error } = updateInfoValidation(req.body);
            if (error)
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details[0].message);

            //<-----------------------update info----------------------------->
            const user = await UserModel.findOneAndUpdate({ username: req.body.username }, req.body, { new: true });
            await user.save();
            res.send('update successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            console.log("connect with updatePassword");
            //<-------------validate data before updating----------------->
            const { error } = updatePasswordValidation(req.body);
            if (error)
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details[0].message);

            //<-------------find username to change password--------------->
            const user = await UserModel.findOneAndUpdate({ username: req.body.username }, req.body, { new: true });

            //<-------------check old valid password-----------------------> 
            const validOldPassword = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!validOldPassword) return res.status(httpStatus.UNAUTHORIZED).send('Invalid old password');

            //<--------------hash new password---------------------------->
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

            //<-------------------change password and save to database--------------->
            user.password = hashedNewPassword;
            await user.save();
            res.send('update password successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const deleteUser = await UserModel.findOneAndRemove({ username: req.body.username });
            return (!deleteUser) ? res.send("cannot delete this user") : res.send("user successfully deleted!");
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }


}