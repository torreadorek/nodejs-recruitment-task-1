const PermissionsRegister = require('../models').PermissionsRegister
const fs = require('fs')
const readline = require('readline')
const path  = require('path')
const { stdout } = require('process')
const { Op } = require('sequelize')
const User = require('../models').User
const getProperties =  require('../utils/getProperties')

module.exports = {
    getLogsByTimestamp: async (req,res,next)=>{
        try{
            const token = req.header('authorization-token')
            const user = await User.findOne({
                where:{
                    token
                },
                include:[
                    {
                        model:PermissionsRegister,
                        as:'PermissionsRegisters',
                        where:{
                            [Op.or]:[{'$User.isAdmin$':true},{permissionName:'read'}]
                        }
                    }
                ]
            }) 
            if(user) {
                const {from,to} = req.query
                let temporaryArray = []
                const readlines = readline.createInterface({
                    input:fs.createReadStream(path.join(__dirname+'../../events.log')),
                    output:stdout,
                    terminal:false
                })
                for await (const line of readlines) {
                    const [timestamp,uuid,type,message] = getProperties(line)
                       if(from && to ) {
                         if(timestamp>=from && timestamp<=to)  temporaryArray.push({
                                time:new Date(Math.round(timestamp)),
                                uuid,
                                type,
                                message
                           })
                       } else {
                            temporaryArray.push({
                                time:new Date(Math.round(timestamp)),
                                uuid,
                                type,
                                message
                            })
                       }
                }
                readlines.close()              
                if(temporaryArray.length!==0) res.status(200).json(temporaryArray)
                else res.status(404).json({message:'Resources not found'})
            } else res.status(403).json({message:'Unauthorized action'})
            
        }catch(error){
            next(error)
        }
        
    },
    getLogsByUUID: async (req,res,next)=>{
      try{
        const token = req.header('authorization-token')
        const user = await User.findOne({
            where:{
                token
            },
            include:[
                {
                    model:PermissionsRegister,
                    as:'PermissionsRegisters',
                    where:{
                        [Op.or]:[{'$User.isAdmin$':true},{permissionName:'read'}]
                    }
                }
            ]
        }) 
        if(user) {   
            let temporaryArray = []
            const readlines = readline.createInterface({
                input:fs.createReadStream(path.join(__dirname+'../../events.log')),
                output:stdout,
                terminal:false
            })
            for await (const line of readlines) {
                const [timestamp,uuid,type,message] = getProperties(line)
                const uuidParam = req.params.uuid
                    if(timestamp && uuid && type && message) {
                    if(uuid === uuidParam) {
                        temporaryArray.push({
                            time:new Date(Math.round(timestamp)),
                            type,
                            message
                        })
                    }             
                }
            }
            readlines.close()
            if(temporaryArray.length!==0) res.status(200).json(temporaryArray)
            else res.status(404).json({message:'Resources not found'})
        } else res.status(403).json({message:'Unauthorized action'})
      }catch(error){
          next(error)
      }
    }
}