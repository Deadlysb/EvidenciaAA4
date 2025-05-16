const mongoose = require('mongoose');

const valuesSchema = new mongoose.Schema({
    label: {type:String, required: true},
    data: {type:Number, required: true}
},{
    timestamps: true
});

module.exports = mongoose.model('values', valuesSchema);