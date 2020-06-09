const mongoose = require("mongoose");

const CounterCollectionSchema = mongoose.Schema({
    name        :   { type : String , required : true, unique : true},
    amount      :   { type : Number , required : true, default : 0}
})

const CounterCollection = module.exports = mongoose.model('CounterCollection', CounterCollectionSchema);

module.exports.getCounterByname = function(name, callback){
    const query = {name: name}
    const option = {upsert : true }
    CounterCollection.findOne(query, option, callback);
}

module.exports.increment = async function(name){
    return new Promise((resolve, reject) => {
        const query = {name : name}
        const update = { $inc : { amount : +1 }}
        const option = { upsert : true }
        CounterCollection
            .findOneAndUpdate(query, update, option)
            .then(object => {
                resolve(object)
            })
            .catch(err => {
                reject(err)
            })
    })
}