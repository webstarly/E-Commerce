const userModel = require("../../models/userModel")

async function updateUserController(req,res){
    try{
        const sessionUser = req.userId

        const {userId, email, name, role} = req.body

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        const user = await userModel.findById(sessionUser);

        console.log('userr', user)

        const uploadUser = await userModel.findByIdAndUpdate(userId, payload)

        res.status(200).json({
            data : uploadUser,
            message : "User Successfully Updated",
            error: false,
            success: true
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = updateUserController