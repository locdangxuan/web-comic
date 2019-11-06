const userModel = require('../../api/models/user.model');
const httpStatus = require('http-status');

module.exports = {
    index: async (req, res) => {
        try {
            let listUser = await userModel.find();
            res.render('users/index', {
                users: listUser
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}