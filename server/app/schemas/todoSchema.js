'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
    message: String,
    status: {
        type: Boolean,
        default: false
    },
    isChecked: {
        type: Boolean,
        default: false
    }
});


TodoSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = TodoSchema;