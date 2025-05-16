const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    label: {type:String, required: true},
    data: {type:Number, required: true}
});

module.exports = mongoose.model('statistics', valueSchema,'values');