const mongoose = require('mongoose');
const validator = require('validator');

const personnelSchema = new mongoose.Schema({
    id_number: {
        type: String,
        required: [true, 'Please enter your id number'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
	name: {
		type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
	},
	age: {
		type: Number,
        required: [true, 'Please enter your age'],
        // min: [18, 'Your age must be above 18'],
        // max: [100, 'Your age must is too old, please check your inputed age'],
        // default: 0.0
	},
	gender: {
		type: String,
        required: [true, 'Select your gender'],
    //     enum: {
    //         values: ['Male', 'Female'],
    //         message: 'There is error on proccessing this input'
    //     }
	},
	contact: {
		type: String,
        required: [true, 'Please enter your contact number'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
	},
	address: {
		type: String,
        // required: [true, 'Please enter your address'],
        trim: true,
        // maxLength: [100, 'Your address cannot exceed 100 characters'],
        // minLength: [1, 'Your address is too short. please specify']
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
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
	},
	// avatar: {
 //        public_id: {
 //            type: String,
 //            // required: true
 //        },
 //        url: {
 //            type: String,
 //            // required: true
 //        }
 //    },
    role: {
    	type: String,
        default: 'personnel',
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
})
module.exports = mongoose.model('Personnel',personnelSchema);