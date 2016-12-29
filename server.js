var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var request = require("request");
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('client'));


var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.connect('mongodb://dungdinh:tthuyddung218@ds129038.mlab.com:29038/auctioning');

var secret = '131205413120661312072';
app.set('superSecret', secret);


var User = require('./models/user');
var Product = require('./models/product');

var apiRoutes = express.Router();

//############################ Authenticate ############################################


apiRoutes.post('/users', function(req, res) {

    // create a sample user
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: false
    });

    // save the sample user
    user.save(function(err) {
        if (err) {
            res.status(400).json({
                'error': 'bad request'
            });
        }

        console.log('User saved successfully');
        res.status(201).send({
            'message': 'user created'
        });
    });
});

apiRoutes.post('/authenticate/facebook', function(req, res) {
    console.log('authenticate facebook');

    var access_token = req.body.access_token;
    request({
            uri: "https://graph.facebook.com/me?access_token=" + access_token + '&fields=name,email,picture',
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        },
        function(error, response, body) {
            if (response.statusCode === 200) {
                var obj = JSON.parse(body);
                var fb_user_id = obj.id;
                var name = obj.name;
                var email = obj.email;
                var picture = obj.picture.data.url;
                User.findOne({
                    username: fb_user_id
                }, function(err, user) {

                    if (err) {
                        console.log(err);
                    }

                    console.log(response);
                    if (!user) {
                        var user = new User({
                            username: fb_user_id,
                            password: fb_user_id,
                            admin: false
                        });

                        user.save(function(err) {
                            if (err) {
                                console.log('error create new user' + err);
                            } else {
                                console.log('User saved successfully');
                                var token = jwt.sign(user, app.get('superSecret'), {
                                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                                });
                                res.json({
                                    userId: user.username,
                                    token: token,
                                    name: name,
                                    email: email,
                                    picture: picture
                                });
                            }
                        });
                    } else {
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        });
                        res.json({
                            userId: user.username,
                            token: token,
                            name: name,
                            email: email,
                            picture: picture

                        });
                    }
                });
            } else {
                res.status(401).send("Oh uh, something went wrong, cannot authenticate");
            }
        });
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    console.log('------Vo ham-----')

    console.log(req.body.username);
    console.log(req.body);
    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        console.log(user);
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    username: user.username,
                    token: token
                });
            }

        }

    });
});


var port = process.env.PORT || 8081;

apiRoutes.get('/', function(req, res) {
    res.send('API run at localhost:' + port + '/api');
});

app.use('/api', apiRoutes);


//Test 


app.listen(port);
console.log('server is running at port::' + port);