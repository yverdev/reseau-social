//Imports
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');

//Routes
module.exports = {
    register: (req,res) => {
        // params
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;

    if (email == null || username == null || password == null){
        return res.status(400).json({ 'error': 'missing parameters'});
    }
        // TODO: verify pseudo lenth, mail regex, password etc...
    models.User.findOne({
        attributes: ['email'],
        where: {email: email}
    })
    .then((userFound) => {
        if (!userFound){
            bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then((newUser) => {
                    return res.status(200).json({
                        'userId': newUser.id
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': 'cannot add user'});
                });
            });
        } else {
            return res.status(400).json({ 'error': 'user already exist'});
        }
    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify user'});
    })
    },
    login: (req, res) => {
         // TODO: to implement
    }
}