const User = require('../models').User
const PermissionsRegister = require('../models').PermissionsRegister

module.exports = {
    addUser:  async (req,res,next)=>{
        try{
            const token = req.header('authorization-token')
            const {username} = req.body
            const permissions = ['create','read']
            const admin = await User.findOne({
                where:{
                    token,
                    isAdmin:true
                },
                raw:true
            }) 
            if(admin) { 
                 const [user,created]  = await User.findOrCreate({
                    where:{
                        username
                    }
                })
                const transformPermissions = permissions.map(permission=> permision = {permissionName:permission,userId:user.id})
                if(created) await  PermissionsRegister.bulkCreate(transformPermissions)
                .then(permissions=>{
                    const returnPermissions = permissions.map(permission=> permision = permission.permissionName)
                    if(permissions)  res.status(200).json({username:user.username,token:user.token,permissions:returnPermissions})
                        else res.status(500).json({message:'Unable to add permissions'})
                    })
                else res.status(409).json({message:'This user already exist'})
            } else res.status(403).json({message:'Unauthorized action'})
                
        }catch(error) {
            next(error)
        }
    }
}