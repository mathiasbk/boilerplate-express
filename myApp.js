require('dotenv').config();
var bodyParser = require('body-parser');

let express = require('express');
const { userPassedConsoleChallenge } = require('fcc-express-bground/globals');
let app = express();

console.log("Hello world");

app.use(bodyParser.urlencoded({ extended: false }));

//Logger
app.use(function middleware(req, res, next)
{
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', function (req, res) {
    if(process.env.MESSAGE_STYLE == "uppercase")
    {
        res.json({ "message": "HELLO JSON" });
    }
    else
    {
        res.json({ "message": "Hello json" });
    }
    
});

app.get('/now', function(req, res, next)
{
    req.time = new Date().toString();
    next();

}, function(req, res)
{
    res.json({"time": req.time});
});

app.get('/:word/echo', function(req, res)
{
    res.json({"echo": req.params.word});
});

app.get('/name', function(req, res)
{
    var returnstring = req.query.first + " " + req.query.last;
    
    res.json({"name": returnstring});
});

app.post('/name', function(req, res)
{
    var returnstring = req.body.first + " " + req.body.last;
    console.log( "returnstring: " + returnstring);
    res.json({"name": returnstring});
});





























 module.exports = app;
