const User = require('../models/userModel');
const createError = require('http-errors');
const bycrypt = require('bcrypt');


const userList = async(req, res) => {
    const userList = await User.find({});
    res.json(userList);
};

const loginUserInfo = (req, res, next) => {
    /*try {
        const user = await User.findById({ _id: req.params.id });

        if (user) {
            return res
                .status(200)
                .json(user);
        } else {
            return res.status(404).json({
                mesaj: 'Kullanici bulunamadi'
            })
        }
    } catch (err) {
        next(err);
    }*/

    res.json(req.user);
};


const patchForUser = async(req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bycrypt.hash(req.body.password, 10);
    }

    const { error } = User.validationWithJoiForUpdate(req.body);

    if (error) {
        next(createError(400, error));
    } else {
        try {
            const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (result) {
                return res.json(result)
            } else {
                return res.status(404).json({
                    mesaj: 'Kullanici bulunamadi'
                })
            }
        } catch (err) {
            next(createError(400, err));
        }
    }

};


const insertUser = async(req, res, next) => {
    try {
        const insertUser = new User(req.body);
        insertUser.password = await bycrypt.hash(insertUser.password, 10);
        const { error } = insertUser.validationWithJoiForInsert(req.body);

        if (error) {
            next(createError(400, error));
            console.log(error);
        } else {
            const result = await insertUser.save();
            res.send(result);
        }
    } catch (err) {
        next(err);
    }
    //res.json(req.body);
};


const login = async(req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        //const userToken = new User();
        const token = await user.generateToken();
        console.log(token);
        res.json({
            user: user,
            token: token
        });
    } catch (error) {
        next(error);
    }
};


const deleteAllForAdmin = async(req, res, next) => {
    try {
        const result = await User.deleteMany({ isAdmin: false });
        //res.send(result);
        if (result) {
            return res.json({
                mesaj: 'Yonetici olmayan tum kullanicilar silindi'
            });
        }
    } catch (err) {
        next(createError(400, err));
    }
};


const deleteUserForAdmin = async(req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.params.id });
        //res.send(result);
        if (result) {
            return res.json({
                mesaj: 'User silindi'
            });
        } else {

            throw createError(404, 'Kullanici bulunamadi');

            /*const errorObject = new Error('Kullanici bulunamadi');
            errorObject.errorCode = 404;
            throw errorObject;*/

            /*return res.status(404).json({
                mesaj: 'Kullanici bulunamadi'
            });*/
        }
    } catch (err) {
        next(createError(400, err));
    }
};


const deleteUser = async(req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.user._id });
        //res.send(result);
        if (result) {
            return res.json({
                mesaj: 'User silindi'
            });
        } else {

            throw createError(404, 'Kullanici bulunamadi');

            /*const errorObject = new Error('Kullanici bulunamadi');
            errorObject.errorCode = 404;
            throw errorObject;*/

            /*return res.status(404).json({
                mesaj: 'Kullanici bulunamadi'
            });*/
        }
    } catch (err) {
        next(createError(400, err));
    }
};


const patchUserForAdmin = async(req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bycrypt.hash(req.body.password, 10);
    }

    const { error } = User.validationWithJoiForUpdate(req.body);

    if (error) {
        next(createError(400, error));
    } else {
        try {
            const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (result) {
                return res.json(result)
            } else {
                return res.status(404).json({
                    mesaj: 'Kullanici bulunamadi'
                })
            }
        } catch (err) {
            next(createError(400, err));
        }
    }

};

module.exports = {
    userList,
    loginUserInfo,
    patchForUser,
    insertUser,
    login,
    deleteAllForAdmin,
    deleteUserForAdmin,
    deleteUser,
    patchUserForAdmin
}