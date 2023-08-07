//Set the flash message cookie
module.exports.setFlash = function (req, res, next) {
	res.locals.flash = req.flash();
	next();
};
