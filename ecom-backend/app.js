import cors from "cors"
import express from "express"
const app = express()

app.use(express.json())
app.use(cors({origin:"*"}))

// routes

import adminRoutes from "./routes/admin"
import userRoutes from "./routes/users"

app.use("/api",userRoutes)
app.use("/api",adminRoutes)
app.use("/image",express.static("images"))



export default app;

