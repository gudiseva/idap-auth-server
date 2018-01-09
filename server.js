var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://kodiak-demo.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://kodiak-demo.com/api',
    issuer: "https://kodiak-demo.auth0.com/",
    algorithms: ['RS256']
});

app.use(cors());
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  //res.send('Secured Resource');
  res.json({ message: 'This is a secure endpoint' });
  //res.redirect('http://localhost:7777/');
});

app.listen(port);
console.log('Server running on localhost:8080')