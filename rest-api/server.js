const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const {auth} = require('./middleware/auth');

const config = require('./config/config');


db().catch(err => console.log(err));
async function db () {
    await mongoose.connect('mongodb://localhost:27017/pets'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
};


app.use(cors());
app.use(express.json());

 app.use(auth);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to pets application." });
  });

app.use('/api' , routes);

  app.listen(config.PORT , () => {
    console.log(`Server is listening on port ${config.PORT}...`);
  });