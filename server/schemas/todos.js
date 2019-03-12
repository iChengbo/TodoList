/**
 * Created by Administrator on 2019/3/5.
 */
/*数据库*/
// let mongoose = require('mongoose');

// todos的表结构
// module.exports = new mongoose.Schema({
//     id: String,
//     message: String,
//     status: Number
// });

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
    message: String,
    status: {
        type: Boolean,
        default: false
    },
    isCompleted: {
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