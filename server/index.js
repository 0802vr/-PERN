require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const fileUpLoad = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHadler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express();
app.use((cors()))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))

app.use(fileUpLoad({}))
app.use('/api', router)
app.use(errorHadler)


const start = async()=> {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log( `server run on port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}
start()
  