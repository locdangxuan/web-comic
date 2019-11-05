const comicModel = require('../../api/models/comic.model');
const httpStatus = require('http-status');

module.exports = {
    index: async (req, res) => {
        try {
        	let listComic = await comicModel.find();
        	res.render('comics/index', {
        		comics: listComic
        	}) 
        } catch {
        	res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
};