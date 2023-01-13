const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this schema responsible for adding completed workout of a user to the db 
const workOutSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    runType: {
        type: String,
        default: true,
    },
});

module.exports = mongoose.model("workout", workOutSchema);