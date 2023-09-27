const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use(cors())
// default URL for website
app.use('/createFile', function (req, res) {

    var data = '{ "text": "data1", "text2": "data2" }'

    fs.writeFile("../Components/Common/test.json", data, function (err) {
        if (err) {
            return console.log(err);
        } else {
            res.status(200).send({ message: "The file was saved!" });
        }
    });

});


const server = http.createServer(app);
const port = 3232;
server.listen(port);
console.debug('Server listening on port ' + port);