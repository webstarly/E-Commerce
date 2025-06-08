const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");


async function userResetPasswordController(req , res){
    try{

        const token = req.query.token

        console.log("senttoken", token)

        if(!token){
            throw new Error("token not recieved")
       }

       console.log("Request Body:", req.body);

        const { newPassword } = req.body
        if(!newPassword){
            throw new Error("Password not recieved")
           }

           console.log("Password received:", newPassword);

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        console.log("decodedforget",decoded )

        if(!decoded){
            throw new Error("Not decoded")
           } 

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            throw new Error("User not found");
           }
        
        console.log("user", user)

        const salt = bcrypt.genSaltSync(10);
        const hashPassword  =  bcrypt.hashSync(newPassword, salt);

        console.log("hashpassword", hashPassword )

    /*   const user = await userModel.findByIdAndUpdate(
        decoded.userId, 
        { password: hashPassword }, 
        { new: true }
    ); 
        console.log("user", user); */

        user.password = hashPassword;
        await user.save();

        //console.error("Reset Password Error:", error.message);

        return res.status(200).json({
            data : user,
            message: "Password reset successful",
            error: false,
            success: true,
        });

    }catch(error){
        res.status(400).json({
            message : "unable to reset",
            error : true,
            success: false
        })
    }
}

module.exports = userResetPasswordController;