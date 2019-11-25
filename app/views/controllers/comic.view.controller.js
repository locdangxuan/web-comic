const ComicModel = require('../../api/models/comic.model');
const httpStatus = require('http-status');

module.exports = {
    index: async (req, res) => {
        try {
            let listComic = await ComicModel.find();
            res.render('comics/index', {
                comics: listComic
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    searchComic: async (req, res) => {
        try {
            let comics = await ComicModel.find();
            let q = req.query.q;
            let comicFilter = comics.filter(comic => {
                return comic.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
            });
            res.render('comics/index', {
                comics: comicFilter
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
};