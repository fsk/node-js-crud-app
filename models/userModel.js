const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collecction: 'users',
    timestamps: true
});

const schema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(50)
        .trim(),
    surname: Joi
        .string()
        .min(3)
        .max(50)
        .trim(),
    userName: Joi
        .string()
        .min(3)
        .max(50)
        .trim(),
    email: Joi
        .string()
        .trim()
        .email(),
    password: Joi
        .string()

});


UserSchema.methods.validationWithJoiForInsert = function(userObject) {

    schema.required();
    return schema.validate(userObject);
}

UserSchema.statics.validationWithJoiForUpdate = function(userObject) {
    return schema.validate(userObject);
}

UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;


    return user;
}

UserSchema.methods.generateToken = async function() {
    const girisYapanUser = this;
    const token = await jwt.sign({
        _id: girisYapanUser._id,
        email: girisYapanUser.email,
        isAdmin: girisYapanUser.isAdmin
    }, 'secretkey', {
        expiresIn: '1h'
    });
    return token;
};

UserSchema.statics.login = async(email, password) => {

    const { error, value } = schema.validate({ email, password });

    if (error) {
        throw createError(400, error);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw createError(400, `Gecersiz EMAIL / SIFRE`);
    }

    const passwordControl = await bcrypt.compare(password, user.password);

    if (!passwordControl) {
        throw createError(400, `Gecersiz EMAIL / SIFRE`);
    }

    return user;
}


const User = mongoose.model('User', UserSchema);





module.exports = User;