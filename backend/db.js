const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Admin:jZEOL6CqWnapaRou@cluster0.g8cch4b.mongodb.net/Todo")
    .then(() => { console.log("MongoDB connected !"); })
    .catch((e) => { console.log(err); })
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;