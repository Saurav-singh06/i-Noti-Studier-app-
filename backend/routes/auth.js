const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// Create a User using Post "/api/auth". Doesnt require Auth
router.post('/',[
    body('email','Enter a valid Email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })

],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }).then(user => res.json(user));
    res.send(req.body)
})

module.exports=router
