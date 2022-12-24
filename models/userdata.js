const mongoose = require('mongoose');
const myschemea = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    rollNo: {
        type: String,
    },
    userimg: {
        type: String,
    },
    create_at: {
        type: Number,
    }
},
    { timestamps: false }
)

const mymodel = mongoose.model("GDSC_users", myschemea);
module.exports = mymodel;  