const errorHandler = require("../middlewares/error");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/feature");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email }).select("+password");
        if (!user) return next(new errorHandler("User Not Found", 400));
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new errorHandler("Email or Password Invalid", 400));

        sendCookie(user, res, "Login successful", 201);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
      

        let user = await userModel.findOne({ email });
        if (user) return next(new errorHandler("User Already Exists", 400));
    
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        sendCookie(user, res, "Registration successful", 201);
    } catch (error) {
        next(error);
    }
};

 const getMyProfile = (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  };

  const logout = (req, res) => {
    res.status(200)
       .cookie("token", "", {
           expires: new Date(Date.now()),
           sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
           secure: process.env.NODE_ENV === "Development" ? false : true, 
       })
       .json({
           success: true,
           user: req.user
       });
};



module.exports = {
    login,
    register,
    getMyProfile,
    logout
};
