const UserModel = require('../../api/models/user.model');
const httpStatus = require('http-status');

module.exports = {
    index: async (req, res) => {
        try {
            let listUser = await UserModel.find();
            res.render('users/index', {
                users: listUser
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    searchUser: async (req, res) => {
        try {
            let users = await UserModel.find();
            let q = req.query.q;
            let userFilter = users.filter(user => {
                return user.firstName.toLowerCase().indexOf(q.toLowerCase())  !== -1 ||
                    user.lastName.toLowerCase().indexOf(q.toLowerCase())  !== -1 ;
            });
            res.render('users/index', {
                users: userFilter
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}