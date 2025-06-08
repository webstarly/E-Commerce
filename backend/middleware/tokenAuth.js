const jwt = require("jsonwebtoken");

async function tokenCookieAuth(req, res, next){
    try{
        const token = req.cookies?.token 

        console.log("token   ---", token );

        if(!token){
            return res.status(200).json({
                message : "Login please.....",
                error : true,
                success: false
            })
        } 

        jwt.verify(token, process.env.TOKEN_SECRET_KEY , function(err, decoded) {
            console.log(err)
            console.log("decoded", decoded) 
         

            if(err){
                console.log("auth error", err)
            }

            req.userId = decoded?._id;
            //console.log('req.userId :', req.userId) 
            next() 
        });

    }catch(err){
        res
        .status(400)
        .json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = tokenCookieAuth ;