const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const {registerValidation, loginValidation, hashPassword} = require('../controllers/userController');



//User Register
router.post('/register', async(req, res) => {

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email});
    if(emailExists) return res.status(400).send("Email already exists");
    
    // hashingPassword
    const saltRounds = await bcrypt.genSalt(parseInt(process.env.SALT, 10 ));
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 
   
    // let hashedPassword;
    // hashPassword(req.body.password).then((result) => {
    //    const hashedPassword = await hashPassword(req.body.password);
    // });

    
    //Adding User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{ 
        const savedUser = await user.save();
        res.status(200).send({user: savedUser.id});
    }catch(err){
        res.status(400).send(err);
    }   
});


//User Login 
router.post('/login', async(req, res) => {

     //Validation
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const user = await User.findOne({ email: req.body.email});
     if(!user) return res.status(400).send("Email or Password is wrong!");

     //CorrectPassword
     validPassword = await bcrypt.compare(req.body.password, user.password)
     if(!validPassword) return res.status(400).send("Email or Password is wrong!");
        
     
     //create and send token
     const token = jwt.sign({_id : user._id}, process.env.SECRET);
     res.header('auth-token', token).send(token);

})

//user Logout
router.post('/logout', (req, res) => {
    const token = "";
    res.header('auth-token', token).send(token);
})

module.exports = router;