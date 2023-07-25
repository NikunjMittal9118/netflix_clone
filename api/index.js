import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
dotenv.config()
const app = express()

//middlewares
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


//connection request
mongoose.connect(process.env.DB_URL).then((res) => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log(`err is : ${err}`)
})


import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import movieRouter from './routes/movieRoute.js'
import listRouter from './routes/listRoute.js'

// middleware requests
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/list", listRouter)

app.listen(8100, () => {
    console.log("Server started")
})









