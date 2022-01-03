const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Data = require('./models/data');
global.bodyParser = require('body-parser');

dotenv.config({ path: './.env' })

const dbUrl =  'mongodb://localhost:27017/rento';

mongoose.connect(dbUrl , {
    useNewUrlParser: true,
  //  useCreateIndex: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
 }))

// app.post("/stored", async (req , res)=>{

//    // const { id } = req.body;
//     data = new Data(req.body);
//     const data = await Data.find({})
//     await data.save();
//     res.send("rento")
// })

// app.post('/stored', (req, res) => {
//     console.log(req.body);
//     db.collection('rento-app').insertOne(req.body, (err, data) => {
//         if(err) return console.log(err);
//         res.send(('saved to db: ' + data));
//     })
// });

app.post('/stored', (req, res) => {
    console.log(req.body);
      db.collection('rentalDataa').insertOne(req.body, (err, data) => {
       if (err) return console.log(err);
       res.send(('saved to db: ' + data));
    })
 });

 app.get("/stored" , async (req,res) => {
  let x = await db.collection('rentalDataa').find().toArray()
  console.log(x)
  res.send(x)
  })


 if ( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })
}

const PORT = process.env.PORT || 8080

app.listen(8080, () => {
    console.log(`running on ${PORT}`)
})