const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function forgetPasswordController(req, res){
    try{
        const { email } = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            throw new Error("User not found");
        }

        //console.log("userforget", user);

        const generateResetToken = async (userId) => { 
            const token = await jwt.sign(
                {userId},
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: "1h" }
            );
            return token ;   
        }
 
       


        const resetToken = await generateResetToken(user._id);
        const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        console.log("resetLink", resetURL)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
        });

        res.status(200).json({
            message : "Reset link successfully sent",
            error : false,
            success: true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success: false
        })
    }
}

module.exports = forgetPasswordController;