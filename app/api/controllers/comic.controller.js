const ComicModel = require('../models/comic.model');
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
            const deleteComic = await ComicModel.findOneAndRemove({_id: req.body.id});
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
    }
}