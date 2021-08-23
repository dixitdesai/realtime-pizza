const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    role: {
        type: String,
        default: 'customer'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)