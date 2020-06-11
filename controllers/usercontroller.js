const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP
router.post('/signup', (req, res) => {
    console.log(req.body);
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        userName: req.body.user.userName,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.send(500, err)
    ) 
})

// LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            userName: req.body.user.userName
        }
    })
        .then(user => {
            if(user){
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if(matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user: user,
                            message: 'user successfully logged in',
                            sessionToken: token 
                        })
                    } else {
                        res.status(502).send({error: 'bad gateway'})
                    }
                })
            } else {
                res.status(500).send({error: 'failed to authenticate'})
            }
        }, err => res.status(501).send({error: 'failed to process'}))
})

module.exports = router;