const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/public/dist/public'));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve('public/dist/public/index.html'))
});

app.listen(8000, function(){
    console.log('listening in localhost on port 8000!');
});