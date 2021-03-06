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
var Item = require('./models/item');
var Userauction = require('./models/userauction');
var Userfollow = require('./models/userfollow');
var Account = require('./models/account');
var Notification = require('./models/notification');

var apiRoutes = express.Router();








//##############################################-Non-authenticate API-######################################
//##############################################-Non-authenticate API-######################################
//##############################################-Non-authenticate API-######################################









//------------------------------------------------------User------------------------------------------------
//GET
//Lay 1 user theo ID
apiRoutes.get('/users/:ID', function(req, res) {
    var id = req.params.ID;
    User.find({
        ID: id
    }).select().exec(function(err, users) {
        if (err)
            res.status(400).send(err);
        else {
            res.status(200).send(users);
            //console.log(users);
        }
    });
});

//Lay tat ca user
apiRoutes.get('/users', function(req, res) {
    User.find({}).select().exec(function(err, users) {
        if (err)
            return console.log(users);
        else {
            res.status(200).send(users);
            //console.log(users);
        }
    });
});

//------------------------------------------------------Item------------------------------------------------

//GET
//Lay 1 item theo ID
apiRoutes.get('/items/:ID', function(req, res) {
    var id = req.params.ID;
    Item.find({
        ID: id
    }).select().exec(function(err, items) {
        if (err)
            return console.log(items);
        else {
            res.status(200).send(items);
        }
    });
});

//Lay tat ca item
apiRoutes.get('/items', function(req, res) {
    Item.find({}).select().exec(function(err, items) {
        if (err)
            return console.log(items);
        else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-------------------------ITEM API------------------
//API lấy 4 sản phẩm đấu giá mới nhất
apiRoutes.get('/new_items', function(req, res) {
    Item.find({}).sort({
        ngayTao: 1
    }).limit(4).exec(function(err, items) {
        if (err) {
            res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//API lấy từ mỗi danh mục 5 sản phẩm mới nhất
//--Đồ điện tử
apiRoutes.get('/new_electronic_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ điện tử'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//--API lấy tất cả Đồ điện tử
apiRoutes.get('/all_electronic_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ điện tử'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//--Giai trí, thể thao, sở thích
apiRoutes.get('/new_entertainment_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Giải trí, thể thao, sở thích'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//--Lấy tất cả items Giai trí, thể thao, sở thích
apiRoutes.get('/all_entertainment_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Giải trí, thể thao, sở thích'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Xe cộ, máy móc
apiRoutes.get('/new_vehicle_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Xe cộ, máy móc'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Xe cộ, máy móc
apiRoutes.get('/all_vehicle_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Xe cộ, máy móc'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Mẹ và bé
apiRoutes.get('/new_momandbaby_titems', function(req, res) {
    Item.find({
        chuyenMuc: 'Mẹ và bé'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Mẹ và bé
apiRoutes.get('/all_momandbaby_titems', function(req, res) {
    Item.find({
        chuyenMuc: 'Mẹ và bé'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Thời trang & phụ kiện
apiRoutes.get('/new_fashion_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Thời trang & phụ kiện'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Thời trang & phụ kiện
apiRoutes.get('/all_fashion_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Thời trang & phụ kiện'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Đồ ăn, thức uống
apiRoutes.get('/new_food_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ ăn, thức uống'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Đồ ăn, thức uống
apiRoutes.get('/all_food_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ ăn, thức uống'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Đồ gia dụng
apiRoutes.get('/new_home_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ gia dụng'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Đồ gia dụng
apiRoutes.get('/all_home_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Đồ gia dụng'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Sức khỏe & sắc đẹp
apiRoutes.get('/new_healthy_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Sức khỏe & sắc đẹp'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Sức khỏe & sắc đẹp
apiRoutes.get('/all_healthy_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Sức khỏe & sắc đẹp'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Bất động sản
apiRoutes.get('/new_realty_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Bất động sản'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Bất động sản
apiRoutes.get('/all_realty_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Bất động sản'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Các loại khác
apiRoutes.get('/new_other_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Các loại khác'
    }).sort({
        ngayTao: 1
    }).limit(5).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

//-- Lấy tất cả items Các loại khác
apiRoutes.get('/all_other_items', function(req, res) {
    Item.find({
        chuyenMuc: 'Các loại khác'
    }).sort({
        ngayTao: 1
    }).exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});


//-- Lấy các items của 1 user
apiRoutes.get('/get_items', function(req, res) {
    var userID = req.query.userID;
    Item.find({
        nguoiBan: userID
    }).select().exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            // console.log(items);
        }
    });
});

//-- Tìm kiếm items
apiRoutes.get('/search', function(req, res) {
    var tmp = req.query.search;
    Item.find({
        'ten': {
            '$regex': tmp, $options: '-i' 
        }
    }).select().exec(function(err, items) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(items);
            //console.log(items);
        }
    });
});

apiRoutes.get('/item_auctioning', function(req, res) {
    var _userID = req.query.userID;
    Userauction.find({
        userID: _userID
    }).select().exec(function(err, userauctions) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(userauctions);
        }
    });
});

//Lấy toàn bộ item đang theo dõi của 1 user
apiRoutes.get('/item_following/:ID', function(req, res) {
    var _userID = req.params.ID;
    Userfollow.find({
        userID: _userID
    }).select().exec(function(err, userfollows) {
        if (err) {
            return res.status(404).send('Not found');
            console.log('Failed!!');
        } else {
            res.status(200).send(userfollows);
        }
    });
});

//------------------------------------------------------User Auction------------------------------------------------

//GET
//Lay 1 userauction theo userID va itemID
apiRoutes.get('/userauctions', function(req, res) {
    var _userID = req.query.userID;
    console.log(req.query.userID);
    var _itemID = req.query.itemID;
    Userauction.find({
        userID: _userID,
        itemID: _itemID
    }).select().exec(function(err, userauctions) {
        if (err)
            return console.log(userauctions);
        else {
            res.status(200).send(userauctions);
            //console.log(userauctions);
        }
    });
});

//Lay tat ca userauction
apiRoutes.get('/userauctions', function(req, res) {
    Userauction.find({}).select().exec(function(err, userauctions) {
        if (err)
            return console.log(userauctions);
        else {
            res.status(200).send(userauctions);
            //console.log(userauctions);
        }
    });
});


//------------------------------------------------------User follow------------------------------------------------

//GET
//Lay 1 userfollow theo ID &^&*#$*&@$@
apiRoutes.get('/userXXXXXfollows/:ID', function(req, res) {
    var id = req.params.ID;
    Userfollow.find({
        ID: id
    }).select().exec(function(err, userfollows) {
        if (err)
            return console.log(userfollows);
        else {
            res.status(200).send(userfollows);
            console.log(userfollows);
        }
    });
});

// Lấy toàn bộ item mà user đang theo dõi
apiRoutes.get('/userfollows/:ID', function(req, res) {
    var userID = req.params.ID;
    var items = [];
    Userfollow.find({
        userID: req.params.ID
    }).select().exec(function(err, followed_items) {
        if (err)
            return console.log(followed_items);
        else {
            if (followed_items) {
                for (var i = 0; i < followed_items.length; i++) {
                    //Lấy từng item
                    Item.find({
                        ID: followed_items[i].itemID
                    }).select().exec(function(err, item) {
                        if (item) {
                            items.push(item[0]);
                            if (items.length === followed_items.length) {
                                console.log('Lay danh sach followed items thanh cong!');
                                res.status(200).send(items);
                            }
                        }
                    });
                }
            } else {
                res.status(200).json({
                    'follow': false
                });
            }
        }
    });
});

//Lay tat ca userfollow
apiRoutes.get('/userfollows', function(req, res) {
    var _userID = req.query.userID;
    var _itemID = req.query.itemID;
    Userfollow.findOne({
        userID: _userID,
        itemID: _itemID
    }).select().exec(function(err, userfollow) {
        if (err)
            return console.log(userfollow);
        else {
            if (userfollow) {
                res.status(200).json({
                    'follow': true
                });
            } else {
                res.status(200).json({
                    'follow': false
                });
            }
        }
    });
});








//#########################################-Authentication API-#################################
//#########################################-Authentication API-#################################
//#########################################-Authentication API-#################################









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
                var picture = 'https://graph.facebook.com/' + fb_user_id + '/picture?width=300&height=300';

                Account.findOne({
                    ID: fb_user_id
                }, function(err, account) {

                    if (err) {
                        console.log(err);
                    }

                    if (!account) {
                        var account = new Account({
                            ID: fb_user_id,
                            password: fb_user_id
                        });

                        account.save(function(err) {
                            if (err) {
                                console.log('error create new user' + err);
                            } else {
                                console.log('Account saved successfully');

                                if (!email) {
                                    email = '';
                                }
                                var user = new User({
                                    ID: fb_user_id,
                                    ten: name,
                                    email: email,
                                    avatar: picture
                                });


                                user.save(function(err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });


                                var token = jwt.sign(account, app.get('superSecret'), {
                                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                                });

                                res.json({
                                    userID: fb_user_id,
                                    token: token,
                                    name: name,
                                    email: email,
                                    picture: picture
                                });
                            }
                        });
                    } else {
                        var token = jwt.sign(account, app.get('superSecret'), {
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        });
                        res.json({
                            userID: account.ID,
                            token: token,
                            name: name,
                            email: email,
                            picture: picture

                        });
                    }
                });
            } else {
                res.status(400).send("Oh uh, something went wrong, cannot authenticate");
            }
        });
});

apiRoutes.post('/register', function(req, res) {

    var userID = req.body.userID;
    var username = req.body.username;
    var password = req.body.password;

    // find the user
    Account.findOne({
        ID: userID
    }, function(err, account) {

        if (err) {
            console.log(err);
        }

        if (!account) {
            var account = new Account({
                ID: userID,
                password: password
            });
            account.save(function(err) {
                if (err) {
                    console.log('error create new account' + err);
                } else {
                    var user = new User({
                        ID: userID,
                        ten: username,
                        email: ''
                    });
                    user.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('created new user');
                            res.status(201).send("Đăng ký thành công!");
                        }
                    });
                    console.log('Created new account');
                }
            });
        } else if (account) {
            res.status(400).send("* Tên đăng nhập đã tồn tại");
        }

    });
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    console.log('------Vo ham-----')

    console.log(req.body.username);
    // find the account
    Account.findOne({
        ID: req.body.username
    }, function(err, account) {

        if (err) {
            console.log(err)
        };

        if (!account) {
            res.status(400).json({
                success: false,
                message: 'Authentication failed. Account not found.'
            });
        } else {

            // check if password matches
            if (account.password != req.body.password) {
                res.status(400).json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                User.findOne({
                    ID: account.ID
                }, function(err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (user) {
                            // if user is found and password is right
                            // create a token
                            var token = jwt.sign(account, app.get('superSecret'), {
                                expiresIn: 60 * 60 * 24 // expires in 24 hours
                            });

                            // return the information including token as JSON
                            res.json({
                                userID: account.ID,
                                token: token,
                                name: user.ten
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Authentication failed.User not found.'
                            });
                        }
                    }
                });
            }

        }

    });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});








//##############################################-User API-######################################
//##############################################-User API-######################################
//##############################################-User API-######################################









//ADD
apiRoutes.post('/users', function(req, res) {

    // create a sample user
    var user = new User({
        ID: req.body.ID,
        email: req.body.email,
        ten: req.body.ten,
        avatar: req.body.avatar,
        soDienThoai: req.body.soDienThoai,
        ngaySinh: req.body.ngaySinh,
        gioiTinh: req.body.gioiTinh,
        diaChi: req.body.diaChi
    });

    // save the user
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

//DELETE
apiRoutes.delete('/users/:ID', function(req, res) {
    User.remove({
        ID: req.params.ID
    }, function(err) {
        if (!err) {
            console.log('remove user successfull');
        } else {
            console.log(error);
        }
    });
});

//EDIT
apiRoutes.put('/users/:ID', function(req, res) {

    var email = req.body.email;
    var ten = req.body.ten;
    var avatar = req.body.avatar;
    var soDienThoai = req.body.soDienThoai;
    var ngaySinh = req.body.ngaySinh;
    var gioiTinh = req.body.gioiTinh;
    var diaChi = req.body.diaChi;


    User.findOne({
        ID: req.params.ID
    }, function(err, user) {

        if (err) throw err;

        if (user) {
            user.email = email;
            user.ten = ten;
            user.avatar = avatar;
            user.soDienThoai = soDienThoai;
            user.ngaySinh = ngaySinh;
            user.gioiTinh = gioiTinh;
            user.diaChi = diaChi;

            user.save(function(err, user1) {
                if (err) {
                    res.status(400).send({
                        'error': 'Bad request (The data is invalid)'
                    });
                    return console.error(err);
                } else {
                    User.find(function(err, users) {
                        res.status(200).send({
                            'messege': 'Updated'
                        });
                    });
                }
            });
        } else {
            res.status(404).send({
                'messege': 'Not found'
            });
        }
    });
});







//##############################################-Item API-######################################
//##############################################-Item API-######################################
//##############################################-Item API-######################################





//ADD
apiRoutes.post('/items', function(req, res) {

    // create a sample item
    var item = new Item({
        ID: req.body.ID,
        moTa: req.body.moTa,
        ten: req.body.ten,
        hinhAnh: req.body.hinhAnh,
        chuyenMuc: req.body.chuyenMuc,
        giaHienTai: req.body.giaHienTai,
        ngayHetHan: req.body.ngayHetHan,
        trangThai: req.body.trangThai,
        tinhTrang: req.body.tinhTrang,
        noiBan: req.body.noiBan,
        vanChuyen: req.body.vanChuyen,
        nguoiBan: req.body.nguoiBan,
        nguoiTra: req.body.nguoiTra,
        giaKhoiDiem: req.body.giaKhoiDiem
    });


    // save the item
    item.save(function(err) {
        if (err) {
            console.log(err);
            res.status(400).json({
                'error': 'bad request'
            });
        } else {
            console.log('Item saved successfully');
            res.status(201).send({
                'message': 'item created'
            });
        }


    });
});

//DELETE
apiRoutes.delete('/items/:ID', function(req, res) {
    Item.remove({
        ID: req.params.ID
    }, function(err) {
        if (!err) {
            console.log('remove item successfull');
        } else {
            console.log(error);
        }
    });
});

//EDIT
apiRoutes.put('/items/:ID', function(req, res) {

    var ten = req.body.ten;
    var hinhAnh = req.body.hinhAnh;
    var chuyenMuc = req.body.chuyenMuc;
    var giaHienTai = req.body.giaHienTai;
    var ngayHetHan = req.body.ngayHetHan;
    var trangThai = req.body.trangThai;
    var tinhTrang = req.body.tinhTrang;
    var noiBan = req.body.noiBan;
    var vanChuyen = req.body.vanChuyen;
    var moTa = req.body.moTa;
    var nguoiBan = req.body.nguoiBan;
    var nguoiTra = req.body.nguoiTra;
    var giaKhoiDiem = req.body.giaKhoiDiem;

    Item.findOne({
        ID: req.params.ID
    }, function(err, u) {

        if (err) throw err;

        if (u) {
            u.ten = ten;
            u.hinhAnh = hinhAnh;
            u.chuyenMuc = chuyenMuc;
            u.giaHienTai = giaHienTai;
            u.ngayHetHan = ngayHetHan;
            u.trangThai = trangThai;
            u.tinhTrang = tinhTrang;
            u.noiBan = noiBan;
            u.vanChuyen = vanChuyen;
            u.moTa = moTa;
            u.nguoiBan = nguoiBan;
            u.nguoiTra = nguoiTra;
            u.giaKhoiDiem = giaKhoiDiem;

            u.save(function(err, u) {
                if (err) {
                    res.status(400).send({
                        'error': 'Bad request (The data is invalid)'
                    });
                    return console.error(err);
                } else {
                    Item.find(function(err, items) {
                        res.status(200).send({
                            'messege': 'Updated'
                        });
                    });
                }
            });
        }
    });
});







//##############################################-Userauction API-######################################
//##############################################-Userauction API-######################################
//##############################################-Userauction API-######################################









//ADD
apiRoutes.post('/userauctions', function(req, res) {
    // create a sample userauction
    var buyerName = req.body.buyerName;
    var userauction = new Userauction({
        userID: req.body.userID,
        itemID: req.body.itemID,
        giaDaTra: req.body.giaDaTra
    });

    Userauction.findOne({
        userID: userauction.userID,
        itemID: userauction.itemID
    }, function(err, user) {
        //console.log(userauction);
        if (err) throw err;
        if (user) {
            user.giaDaTra = userauction.giaDaTra;

            user.save(function(err, user1) {
                if (err) {
                    res.status(400).send({
                        'error': 'Bad request (The data is invalid)'
                    });
                    return console.error(err);
                } else {
                    Item.findOne({
                        ID: user.itemID
                    }).select().exec(function(err, item1) {
                        if (err) {
                            return res.status(404).send('Not found');
                            console.log('Failed!!');
                        } else {

                            item1.nguoiTra = user.userID;
                            item1.tenNguoiTra = buyerName;
                            item1.giaHienTai = user.giaDaTra;

                            item1.save(function(err, abc) {
                                if (err) {
                                    res.status(400).send({
                                        'error': 'Bad request (The data is invalid)'
                                    });
                                    console.error(err);
                                } else {
                                    res.status(200).send({
                                        'message': 'updated'
                                    });
                                    console.log('updated item');
                                }
                            });
                        }
                    });
                }
            });
        } else {
            userauction.save(function(err, user1) {
                if (err) {
                    res.status(400).send({
                        'error': 'Bad request (The data is invalid)'
                    });
                    return console.error(err);
                } else {
                    // //--
                    Item.findOne({
                        ID: userauction.itemID
                    }).select().exec(function(err, items) {
                        if (err) {
                            return res.status(404).send('Not found');
                            console.log('Failed!!');
                        } else {
                            items.nguoiTra = userauction.userID;
                            items.tenNguoiTra = buyerName;
                            items.giaHienTai = userauction.giaDaTra;

                            items.save(function(err) {
                                if (err) {
                                    res.status(400).send({
                                        'error': 'Bad request (The data is invalid)'
                                    });
                                    return console.error(err);
                                } else {
                                    res.status(200).send({
                                        'message': 'updated'
                                    });
                                    console.log('updated item');
                                }
                            });
                        }
                    });
                }
            });
        }
    })

});


//DELETE
apiRoutes.delete('/userauctions/:ID', function(req, res) {
    Userauction.remove({
        userID: req.params.ID
    }, function(err) {
        if (!err) {
            console.log('remove userauction successfull');
        } else {
            console.log(error);
        }
    });
});

//EDIT
apiRoutes.put('/userauctions/:ID', function(req, res) {

    var userID = req.body.userID;
    var itemID = req.body.itemID;
    var giaHienTai = req.body.giaHienTai;
    var giaDaTra = req.body.giaDaTra;

    Userauction.findOne({
        ID: req.params.ID
    }, function(err, u) {

        if (err) throw err;

        if (u) {
            u.userID = userID;
            u.itemID = itemID;
            u.giaHienTai = giaHienTai;
            u.giaDaTra = giaDaTra;

            u.save(function(err, u) {
                if (err) {
                    res.status(400).send({
                        'error': 'Bad request (The data is invalid)'
                    });
                    return console.error(err);
                } else {
                    Userauction.find(function(err, items) {
                        res.status(200).send({
                            'messege': 'Updated'
                        });
                    });
                }
            });
        }
    });
});







//##############################################-Userfollow API-######################################
//##############################################-Userfollow API-######################################
//##############################################-Userfollow API-######################################







//ADD
apiRoutes.post('/userfollows', function(req, res) {

    // create a sample userfollow
    var userfollow = new Userfollow({
        userID: req.body.userID,
        itemID: req.body.itemID
    });
    // sconsole.log(req.body);


    // save the userfollow
    userfollow.save(function(err) {
        if (err) {
            console.log(err);
            res.status(400).json({
                'error': 'bad request'
            });
            return;
        }

        console.log('Userfollow saved successfully');
        res.status(201).send({
            'message': 'userfollow created'
        });
    });
});



//DELETE
apiRoutes.delete('/userfollows', function(req, res) {
    Userfollow.remove({
        userID: req.query.userID,
        itemID: req.query.itemID,
    }, function(err) {
        if (!err) {
            console.log('remove userfollow successfull');
            res.status(200).send('Successfully');
        } else {
            console.log(error);
            res.status(400).send('Error');
        }
    });
});







//##############################################-Notification API-######################################
//##############################################-Notification API-######################################
//##############################################-Notification API-######################################







//Lay tat ca notification
apiRoutes.get('/notifications', function(req, res) {
    var userID = req.query.userID;
    var kind = req.query.kind;
    Notification.find({
        userID: userID,
        kind: kind
    }).sort({
        thoiGian: 1
    }).select().exec(function(err, notifications) {
        if (err)
            return console.log(notifications);
        else {
            res.status(200).send(notifications);
        }
    });
});

//Lay tat ca notification
apiRoutes.post('/notifications_seen', function(req, res) {
    var userID = req.body.userID;
    var kind = req.body.kind;
    Notification.find({
        userID: userID,
        kind: kind
    }).sort({
        thoiGian: 1
    }).select().exec(function(err, notifications) {
        if (err) {
            res.status(400).send({
                'error': 'Bad request (The data is invalid)'
            });
        } else {
            for (var i = 0; i < notifications.length; i++) {
                var noti = notifications[i];
                noti.seen = 1;
                noti.save(function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        //console.log('set seen 1');
                    }
                });
            }
            res.status(200).send({
                'messege': 'Updated'
            });
        }
    });
});


apiRoutes.delete('/notifications/:ID', function(req, res) {
    var ID = req.params.ID;
    Notification.remove({
        _id: ID
    }, function(err) {
        if (!err) {
            console.log('remove notification successfull');
            res.status(200).send('Successfully');
        } else {
            console.log(error);
            res.status(500).send('Error');
        }
    });
});

apiRoutes.delete('/notifications', function(req, res) {
    var userID = req.query.userID;
    var kind = req.query.kind;
    Notification.remove({
        userID: userID,
        kind: kind
    }, function(err) {
        if (!err) {
            console.log('remove all notification successfull');
            res.status(200).send('Successfully');
        } else {
            console.log(error);
            res.status(500).send('Error');
        }
    });
});





var port = process.env.PORT || 8081;

apiRoutes.get('/', function(req, res) {
    res.send('API run at localhost:' + port + '/api');
});

app.use('/api', apiRoutes);


//Test 
var server = app.listen(port);
console.log('server is running at port::' + port);







//#########################################-Socket -#################################
//#########################################-Socket -#################################
//#########################################-Socket -#################################








var createNotiWithData = function(data, userID, status, kind) {
    var notification = new Notification({
        userID: userID,
        itemID: data.itemID,
        name: data.itemName,
        thoiGian: new Date(),
        status: status,
        kind: kind,
        seen: 0
    });
    notification.save(function(err) {
        if (err) {
            console.log('error create new notification' + err);
        } else {
            console.log('Created new auction notification');
        }
    });
};


var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('connection');
    socket.on('new_auction', function(data) {
        console.log('on new_auction event');
        console.log(data.itemID);


        //SEND Auction noti
        Userauction.find({
            itemID: data.itemID
        }).select().exec(function(err, userauctions) {
            if (err)
                return console.log(userauctions);
            else {
                var auction_users = [];
                for (var i = 0; i < userauctions.length; i++) {
                    auction_users.push(userauctions[i].userID);
                    createNotiWithData(data, userauctions[i].userID, 1, 0);
                }
                console.log(auction_users);
                socket.broadcast.emit('auction_notification', {
                    users: auction_users
                });
            }
        });


        //SEND Follow noti
        Userfollow.find({
            itemID: data.itemID
        }).select().exec(function(err, userfollows) {
            if (err)
                return console.log(userfollows);
            else {
                var follow_users = [];
                for (var i = 0; i < userfollows.length; i++) {
                    follow_users.push(userfollows[i].userID);
                    createNotiWithData(data, userfollows[i].userID, 1, 1);
                }
                console.log(follow_users);
                socket.broadcast.emit('follow_notification', {
                    users: follow_users
                });
            }
        });


    });
});

var checkExpiredItems = function() {
    Item.find({}).select().exec(function(err, items) {
        for (var i = 0; i < items.length; i++) {

            if (items[i].ngayHetHan <= new Date() && items[i].trangThai) {
                console.log('update status');
                items[i].trangThai = 0;
                items[i].save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('one item expired');
                });

                var data = {
                    itemID: items[i].ID,
                    itemName: items[i].ten
                };

                Userauction.find({
                    itemID: items[i].ID
                }).select().exec(function(err, userauctions) {
                    if (err)
                        return console.log(userauctions);
                    else {
                        var auction_users = [];
                        for (var i = 0; i < userauctions.length; i++) {
                            auction_users.push(userauctions[i].userID);

                            createNotiWithData(data, userauctions[i].userID, 0, 0);
                        }
                        console.log(auction_users);
                        io.sockets.emit('auction_notification', {
                            users: auction_users
                        });
                    }
                });


                //SEND Follow noti
                Userfollow.find({
                    itemID: items[i].ID
                }).select().exec(function(err, userfollows) {
                    if (err)
                        return console.log(userfollows);
                    else {
                        var follow_users = [];
                        for (var i = 0; i < userfollows.length; i++) {
                            follow_users.push(userfollows[i].userID);
                            createNotiWithData(data, userfollows[i].userID, 0, 1);
                        }
                        console.log(follow_users);
                        io.sockets.emit('follow_notification', {
                            users: follow_users
                        });
                    }
                });

            }
        }
    });
}


//#########################################-Cron monitor -#################################

var cron = require('cron');
var cronJob = cron.job('*/5 * * * * *', function() {
    checkExpiredItems();
});
cronJob.start();