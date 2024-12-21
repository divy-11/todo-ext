const express = require('express');
const Todo = require('./db');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const todo = await Todo.find();
    res.status(200).json(todo);
})

app.post("/", async (req, res) => {
    const inp = req.body;
    console.log(inp);
    await Todo.create({
        title: inp.title,
        description: inp.description,
        date: inp.date
    });
    res.status(200).json({ msg: "Todo Created !" });
})

app.put("/", async (req, res) => {
    const inp = req.body;
    await Todo.updateOne({ _id: inp.id }, {
        title: inp.title,
        description: inp.description,
        date: inp.date,
        completed: inp.completed
    })
    // console.log(inp);
    res.status(200).json({ msg: "Todo Updated !" });
})

app.delete("/", async (req, res) => {
    const inpId = req.body;
    // console.log(inpId);
    try {
        await Todo.deleteOne({ _id: inpId.id });
        res.status(200).json({ msg: "Todo Deleted !" })
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ error: err })
    }
})

app.listen(1717, () => {
    console.log(`Backend running on port 1717`);
})