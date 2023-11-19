const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../Models/User");

const signup = async (req, res) => {
    const { username, email, password, phonenumber, role } = req.body;
  
    // Input validation using Joi
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phonenumber: Joi.string().required(),
      role: Joi.string().required(),  
    });
  
    const { error } = schema.validate({ username, email, password, phonenumber, role });
    if (error) {
      return res.status(400).json({ message: "Validation error", error: error.details });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { phonenumber }] });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phonenumber,
        role,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      res.status(201).json({ user: savedUser._id });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };



module.exports = {
    signup
    
  };