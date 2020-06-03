const router = require('express').Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../Models/model.User");

//Register a user
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name        :   req.body.name,
        email       :   req.body.email,
        username    :   req.body.username,
        password    :   req.body.password,
        role        :   req.body.role
    });
    console.log(newUser);
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({Success : false, msg : "Failed to create User", user : user});
        }else{
            res.json({Success : true, msg : "User created succesfully", user : user});
        }
    });
});

//Authenticate or Login
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;
        if(!user){
            return res.json({success : false, msg : "User Not found"});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user.username}, process.env.key, {
                    expiresIn : 3600 // 1 hr
                });

                res.json({
                    Success : true,
                    token: 'jwt '+token,
                    user:{
                        id: user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        role:user.role
                    }
                })
            }
            else{
                return res.json({
                    Success:false,
                    msg:"Wrong password"
                })
            }
        })
    })
});

//Get Profile only when session is valid
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user : req.user})
});

module.exports = router;