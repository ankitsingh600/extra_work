const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    apikey:{type:String, required:true},
    preferences:{type:String, required:false}
})

module.exports = mongoose.model('User', userSchema);
