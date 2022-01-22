const { Schema, model } = require('mongoose');
// This email Regular Expression was adapted from this solution from Stack Overflow.
// https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email address is required',
            // validate: [validateEmail, 'Please fill a valid email address'],
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId
        },
        
    },
    // {
    //     id: false
    // }
)

const User = model('User', UserSchema);

module.exports = User;