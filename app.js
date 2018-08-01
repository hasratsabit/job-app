
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/post', (req, res) => {
    console.log(req.body);
})



app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
