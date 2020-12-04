const app = require('express')()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const db = require('./models/index')
const user = require('./routes/user')
const logs = require('./routes/logs')
const errorHandler = require('./utils/errorHandler')
dotenv.config({path:__dirname+'/config/.env'})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/internal',user)
app.use('/public',logs)

app.use(errorHandler) 

const server = app.listen(process.env.PORT,()=>{
    db.sequelize.authenticate()
    .then(()=>{
        console.log('Connected to database')
    }).catch(error=>{
        console.log('Error while connecting to database:',error)
    })
    console.log(`Listening on port ${process.env.PORT}`)
}).on('error',(error)=>{
    console.log('Error on listening: ',error)
})

module.exports = server
