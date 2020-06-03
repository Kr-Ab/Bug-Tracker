const mongoose = require("mongoose");
const bcrypt    = require("bcryptjs");
const CounterCollection = require("./model.CounterCollection")

const UserSchema = mongoose.Schema({
    SRN         :   { type : String , unique : true},
    name        :   { type : String },
    email       :   { type : String , required : true, unique : true},
    username    :   { type : String , required : true, unique : true},
    password    :   { type : String , required : true},
    role        :   { type : String }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    console.log(newUser)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            CounterCollection.increment(newUser.role)
                .then((counter, err) => {
                    console.log(counter)
                    newUser.SRN = newUser.role.slice(0,3).toUpperCase() + counter.amount.toString()
                    newUser.save(callback);
                })
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        });
}