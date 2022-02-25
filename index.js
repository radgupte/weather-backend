const express = require('express');
const bodyParser = require('body-parser');
const result = require('./result.json');

const app = express();

const token_jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false
}));

app.listen('3000');
console.log('Node-Express server is running on port 3000');
app.use('/api-docs', require('./swagger'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io','54.189.99.230'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// Weather
app.get('/v1/weather', getWeather);

function getWeather(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    if (token == token_jwt) {
        res.json(result);
    } else {
        return res.sendStatus(403);
    }
}

// Greeting
app.get('/v1/hello', getGreeting);

function getGreeting(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    if (token == token_jwt) {
        res.json({
            'message': 'Heya Fella!'
        });
    } else {
        return res.sendStatus(403);
    }
}


// Authorization
app.post('/v1/auth', getToken);

function getToken(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if(username === 'rad' && password === 'abc54321') {
        res.json({
            'access_token': token_jwt,
            'expires': '2012-04-23T18:25:43.511Z'
        });
    }
}

