const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this schema responsible for adding program to the db and
//number of weeks till competition and miladge of an athlete program based on
const algoSchema = new Schema({
    numberOfWeeks: {
        type: Number,
        required: true,
    },
    miladge: {
        type: Number,
        required: true,
    },
    algoString: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("algo", algoSchema);