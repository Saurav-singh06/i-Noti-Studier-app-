const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// Create a User using Post "/api/auth/createUser". No Login required
router.post('/createUser',[
    body('email','Enter a valid Email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })

], async (req,res)=>{ 
// if there are error,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the email exist already 
    let user = await user.findOne({email : req.body.email}) 
    if (user){
      return res.status(400).json({error : "Sorry a user with this email already exists"})
    }
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: 'Plese enter a unique value',message: err.message})})
})

module.exports=router
