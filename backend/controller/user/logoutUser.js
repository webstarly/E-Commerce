
async function logoutController(req, res){
    try{
        res.clearCookie("token"); 

        res.status(200).json({
            message: 'Logged Out Successfully',
            error: false,
            success: true,
            data : []
        });

    }catch(err){
        res.status(400).json({
            message: err || err.message,
            error: true,
            success: false,
        });
    }
}
module.exports = logoutController;