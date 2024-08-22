import express from "express"
import dbConnect from "./config/db/dbConnect.js"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import postRoute from "./routes/postRoute.js"
import commentRoute from "./routes/commentRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler, notFound } from "./middleware/error/errorHandler.js";

dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: "*"}));
app.use(userRoute);
app.use(categoryRoute)
app.use(postRoute)
app.use(commentRoute)



// error handler
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running ${PORT}`))