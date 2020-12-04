const joi = require('joi')

module.exports = {
    token: joi.object({
        'authorization-token':joi.string().min(36).max(36).required()
    }).options({ allowUnknown:true }),
    addUser:joi.object({
       username:joi.string().alphanum().min(3).max(30).required()
    }).options({allowUnknown:true}),
    getLogsByTimestamp:joi.object({
        from:joi.number(),
        to:joi.number()
    }).options({allowUnknown:true}),
    getLogsByUUID:joi.object({
        uuid:joi.string().min(36).max(36).required()
    }).options({allowUnknown:true})
}