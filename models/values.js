const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    label: String,
    data: Number
});

module.exports = mongoose.model('statistics', valueSchema,'values');