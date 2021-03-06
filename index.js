const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv').config()
const port = 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) =>{
  res.send('work it')
})

const uri = `mongodb+srv://${process.env.DB__USER}:${process.env.DB__PASS}@cluster0.jgk8y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const registerCollection = client.db("volunteerNetwork").collection("regester");

  app.post('/addRegister', (req, res) => {

    const newRegister = req.body;
    registerCollection.insertOne(newRegister)
      .then(result => {
        console.log(result);
      })
    console.log(newRegister);
  })

  app.post('/addVolunteer', (req, res) => {

    const addVolunteer = req.body;
    registerCollection.insertMany(addVolunteer)
      .then(result => {
        console.log(result);
      })
    console.log(addVolunteer);
  })

app.get ('/addVolunteer',(req, res) =>{

registerCollection.find({})
.toArray( (err,documents) => {
res.send(documents);

})

})
});

app.listen(process.env.PORT || port)