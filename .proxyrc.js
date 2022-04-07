// Parcel serve does not set Cache-Control headers
// Workaround from: https://github.com/parcel-bundler/parcel/issues/7546#issuecomment-1074358604

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    })
}