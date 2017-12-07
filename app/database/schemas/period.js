'use strict';

var Mongoose  = require('mongoose');

/**
 * Each connection object represents a user connected through a unique socket.
 * Each connection object composed of {userId + socketId}. Both of them together are unique.
 *
 */
var PeriodSchema = new Mongoose.Schema({
    ChannelID:   { type: Mongoose.Schema.Types.ObjectId, required: false },
    startTime:   { type: Date, required: true },
    endTime:     { type: Date, required: true },
    isRepeat:    { type: Boolean, default: false },
});

var periodModel = Mongoose.model('period', PeriodSchema);

module.exports = periodModel;