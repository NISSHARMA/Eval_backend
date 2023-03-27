const express = require("express")
const { connection } = require("./connection")
const {userRoute}=require("./Routes/userRoute")
const {postRoute}=require("./Routes/postRoute")

require("dotenv").config()
const cors=require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoute)
app.use("/posts",postRoute)



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to Mongo")
    } catch (err) {
        console.log(err)
    }
    console.log("Running Server")
})