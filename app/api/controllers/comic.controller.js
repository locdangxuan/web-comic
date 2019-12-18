const ComicModel = require('../models/comic.model');
const UserModel = require('../models/user.model');
const httpStatus = require('http-status');

module.exports = {
    create: async (req, res) => {
        try {
            //<--------------checking name of comic is already exist---------------->
            const nameExist = await ComicModel.findOne({ name: req.body.name });
            if (nameExist)
                return res.status(httpStatus.BAD_REQUEST).send("comic name already exist");
            //<-------------------------create a comic------------------------------>
            const comic = new ComicModel(req.body);
            //<-------------------------save to database---------------------------->
            await comic.save();
            res.send("Comic successfully created !");
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getListComic: async (req, res) => {
        try {
            const comics = await ComicModel.find();
            res.send(comics);
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    delete: async (req, res) => {
        try {
            const deleteComic = await ComicModel.findOneAndRemove({ _id: req.body.id });
            return (!deleteComic) ? res.send("cannot delete this comic") : res.send("Comic successfully deleted!");
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getComicById: async (req, res) => {
        try {
            const comic = await ComicModel.findById(req.params.id);
            res.send(comic);
        } catch (err) {
            console.log("error")
            return res.status(httpStatus.BAD_REQUEST).send(err)
        }
    },

    update: async (req, res) => {
        try {
            const comic = await ComicModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            await comic.save();
            res.send('update successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    searchComic: async (req, res) => {
        try {
            const comics = await ComicModel.find();
            const q = req.query.q;
            const comicFilter = comics.filter(comic => {
                return comic.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
            });
            res.send(comicFilter);
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getCategories: async (req, res) => {
        try {
            const comics = await ComicModel.find();
            const categories = [];
            comics.forEach(comic => categories.push(comic.category));
            const filterCategory = categories.filter((category, index, array) => {
                return array.indexOf(category) === index
            });
            console.log(filterCategory);
            res.send(filterCategory);
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    newComment: async (req, res) => {
        try {
            const comicExist = await ComicModel.findOne({ _id: req.params.id });
            if (!comicExist)
                return res.send("cannot find comic");
            let checkUserId = false;
            const users = await UserModel.find();
            const userIds = [];
            users.forEach(user => { if (user.token !== null) userIds.push(user._id) });
            const newComment = {
                postedBy: req.body.postedBy,
                content: req.body.content
            }
            userIds.forEach(userId => checkUserId = (!newComment.postedBy.localeCompare(userId)) ? true : false);
            if (checkUserId) {
                res.send(newComment);
                comicExist.comments.push(newComment);
                await comicExist.save();
            } else res.send("You must login before comment")

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    randomComic: async (req, res) => {
        try {
            const comics = await ComicModel.find();
            const random = comics.sort(() => 0.5 - Math.random());
            res.send(random);
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}