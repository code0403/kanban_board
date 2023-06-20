const express = require ("express")
const { connection } = require("./config/db")
const dotenv = require("dotenv")
const { UserRouter } = require("./routes/user.routes")
const { auth } = require("./middleware/authentication")
dotenv.config()
const cors = require('cors')



const app = express()
app.use(express.json())

app.use(cors())

app.use("/users", UserRouter)

//app.use(auth) // middleware



app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log(`Connected to MongoDb\n Server is Running`)
    } catch (error) {
        console.log(error)
      console.log(`Cannot Connect to MongoDb`)  
    }

    console.log(`Server is running at`, process.env.PORT)
})