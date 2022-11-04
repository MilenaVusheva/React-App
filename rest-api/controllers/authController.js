const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { isAuth } = require('../middleware/auth');

router.post('/register', (req, res) => {

    let user = new User(req.body)

    user.save()
        .then(createdUser => {
            console.log(createdUser);
            res.status(201).json({ _id: createdUser._id });
        })
});

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    User.findOne({
        username, password
    })
        .then((user) => {
           // console.log(user)
            const token = jwt.sign({
                _id: user._id,
                username: user.username,
            }, 'somesuperSecret', { expiresIn: 172800 });// 48 hours
            res.status(200).json({
                // message: 'User successfuly logged in!',
                _id: user._id,
                username: user.username,
                accessToken: token,
            })
        })
});

router.put('/logout',isAuth, (req, res) => {
    //console.log(req.user._id)
    let autorizationHeader = req.header('Authorization');

    jwt.sign(autorizationHeader, '', { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.json({ message: 'You have been Logged out' })
        } else {
            res.json({ message: 'Error' })
        }
    });
});

module.exports = router;