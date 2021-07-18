const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async(req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '');
            const result = jwt.verify(token, 'secretkey');

            //console.log('Sonuc:', result);

            const findedUser = await User.findById({ _id: result._id });

            if (findedUser) {
                req.user = await User.findById({ _id: result._id });
            } else {
                throw new Error('Lutfen tekrar giris yapiniz ya da kaydolunuz');
            }

            next();
        } else {
            throw new Error('Lutfen tekrar giris yapiniz.');
        }



    } catch (err) {
        next(err);
    }

}


module.exports = auth;