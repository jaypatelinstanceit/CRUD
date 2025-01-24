// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: true}, 
//     password: {type: String, required: true}
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// module.exports = mongoose.model('User', userSchema);

// schema definition using constructor function class
// class User {
//     constructor() {
//         this.username = null;
//         this.password = null;
//     }
// };

// module.exports = User;



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class User {
    constructor() {
        const schema = new mongoose.Schema({
            username: { type: String, required: true, unique: true },
            password: { type: String, required: true }
        });

        // Hash password before saving
        schema.pre('save', async function (next) {
            if (!this.isModified('password')) return next();
            this.password = await bcrypt.hash(this.password, 10);
            next();
        });

        this.model = mongoose.model('User', schema);
    }
}

module.exports = new User().model;
