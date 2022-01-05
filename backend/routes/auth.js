const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET ='HelloWorld'

// Create a User using Post "/api/auth/createUser". No Login required
router.post(
  "/createUser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are error,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the email exist already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt)
      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //.then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: 'Plese enter a unique value',message: err.message})})t

      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);

      
      // res.json(user);
      res.json({authtoken})


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
