
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// mongoose.connect("\mongodb+srv://press:dpM2qhDcvhsbwxOk@cluster0.wfzfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => console.log('Successfully Connected'))

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
  
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 1010;

app.listen(port, () => console.log(`Listening @ localhost:${port}`));