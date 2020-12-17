const User = require('../Models/User');

exports.postLogin = (req, res, next) => {
    res.json({
        message: "POST Login route"
    })
}

