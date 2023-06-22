const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });


const path = require('path');
let views = path.join(__dirname) + '/views/';
app.use(express.static(path.join(__dirname, 'static')));



app.use(express.json({ limit: '50mb' }));
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))



const mongoose = require('mongoose');
const myuser = require("./models/userdata");
const { query } = require('express');
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    () => {
        console.log("connected to data base");
    }
)



app.get('/', (req, res) => {
    res.sendFile(views + 'home.html');
})
app.get('/alldata', (req, res) => {
    res.sendFile(views + 'alldata.html');
})
app.post('/savedata', async (req, res) => {
    const newuser = new myuser({
        username: req.body.username,
        email: req.body.email,
        rollNo: req.body.rollNo,
        userimg: req.body.userimg,
        create_at: (new Date() - 1),
    });
    const user = await newuser.save();
    res.send(user);
})

app.post('/updatedata/:id', async (req, res) => {
    let data;
    if (req.body.userimg != -1) {
        data = await myuser.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            rollNo: req.body.rollNo,
            userimg: req.body.userimg,
        })
    }
    else {
        data = await myuser.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            rollNo: req.body.rollNo,
        })
    }
    res.send("updated");
})

app.get('/delete/:id', async (req, res) => {
    await myuser.findByIdAndDelete(req.params.id);
    res.send("deleted");
})


app.get('/allids', async (req, res) => {
    if (req.query.username) {
        var myids = await myuser.aggregate([
            {$match: {
                $or: [
                    { "myuser.username": { $regex: req.query.username, $options: "i" } }, { "myuser.email": { $regex: req.query.username, $options: "i" } }
                ]
            }},
            { $group: { _id: "$_id" } }
        ]).exec()
        if (myids[0])
        res.send(myids);
        else res.send({});
    }
    else {
        var myids = await myuser.aggregate([
            { $group: { _id: "$_id" } }
        ]).exec()
        if (myids[0])
            res.send(myids);
        else res.send({});
    }
})


app.get('/user/:id', async (req, res) => {
    const user = await myuser.findById(req.params.id);
    res.send(user);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listning at ${PORT}`);
})
