const express = require('express')
const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoute= require('./Routes/userRoutes')
const adminRoute= require('./Routes/adminRoutes')
const venueRoute= require('./Routes/venueRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('api running')
})

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/venue',venueRoute)

const port = process.env.PORT || 4040


app.listen(port,()=>console.log("Node server listening on "+port))