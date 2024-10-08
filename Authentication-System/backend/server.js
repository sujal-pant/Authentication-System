import express from "express"
import {connectDb} from './ConnectDb/connectdb.js'
import dotenv from "dotenv"
import authRoute  from "./routes/auth.route.js"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
const app = express()
app.use(express.json())
app.use(bodyparser.json())
app.use(cookieParser())
app.use(cors({credentials:true,origin:'http://localhost:5173'}))

app.use('/api/auth',authRoute)
app.listen(3000, () => {
    connectDb()
    
    console.log("Server is running on port 3000")
})