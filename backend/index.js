const connectToDb = require('./db')
const express = require('express')
const cors = require('cors')

const taskRoutes = require('./Routes/route')
const app = express()
const port = 5000
app.use(cors());

connectToDb()

app.use(express.json());

// Set up task routes
app.use('/api', taskRoutes);

app.listen(port , ()=>{
    console.log(`app listening at port: ${port}`)
})



