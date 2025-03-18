import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connectDB from './src/config/dbConfig';
export const app = express()
import dotenv from 'dotenv';
import http from 'http';
import cookieParser from 'cookie-parser';
import session,{ SessionOptions } from 'express-session';
import adminRoutes from './src/infrastructure/router/adminRoutes';
import userRoutes from './src/infrastructure/router/userRoutes';


dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use(
    cors({
        origin:process.env.CORS_URL,
        credentials:true
    })
)

const sessionOptions:SessionOptions={
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000
    },
}

app.use(session(sessionOptions))
const startServer =  async()=>{
    try {
    const PORT = process.env.PORT || 3000
    await connectDB();
    const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use('/admin',adminRoutes)
app.use('/user',userRoutes)

server.on('error',(error)=>{
    console.error('server error: ', error);
})

} catch (error) {
    console.log(error);
}
}
export default startServer