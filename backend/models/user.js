const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    id_number: {
        type: String
    },
    avatar:{
        type: String,
        default: "/images/profile_image.png"
    },
    google: {
        google_mail: {
            type: String,
            unique: true,
        },
        google_id: {
            type: String,
            unique: true,
        }
    },
	name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    course: {
        type: String,
    },
    section: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    age: {
        type: Number
        
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: 'There is error on proccessing this input'
        }
    },
    contact: {
        type: Number,
        minLength: [1, 'Your contact number is too short'],
        maxLength: [12, 'Your contact number is too long'],
        default: 0.0
    },
    address: {
        type: String,
        trim: true,
        maxLength: [100, 'Your address cannot exceed 100 characters'],
        minLength: [1, 'Your address is too short. please specify']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        // minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    notification:{
        pushToken : {
            type: String
        }
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    credentials: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            },
        }
    ],
    role: {
        type: String,
        default: 'student',
        position: {
            type: String,
        }
    },
    status: {
        type: String,
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
	
})
//Password to hash
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
     }

    this.password = await bcrypt.hash(this.password, 10)
});
// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('User', userSchema);