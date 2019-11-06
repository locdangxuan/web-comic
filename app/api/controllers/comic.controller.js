const comicModel = require('../models/comic.model');
const httpStatus = require('http-status');

module.exports = {
    addComic: async (req, res) => {
        try {
            //<--------------checking name of comic is already exist---------------->
            const nameExist = await comicModel.findOne({ name: req.body.name });
            if (nameExist)
                return res.status(httpStatus.BAD_REQUEST).send("comic name already exist");
            //<-------------------------create a comic------------------------------>
            const comic = new comicModel(req.body);
            //<-------------------------save to database---------------------------->
            await comic.save();
            res.send("Comic successfully created !");
        } catch {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getListComic: async (req, res) => {
        try {
            let comics = await comicModel.find();
            res.send(comics);
        } catch (err){
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}