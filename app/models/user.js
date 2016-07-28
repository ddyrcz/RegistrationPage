var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = mongoose.model('User', new Schema({
        name: String,
        password: String,        
    }));