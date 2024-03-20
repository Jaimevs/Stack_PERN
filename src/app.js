import express from 'express';
import morgan from 'morgan'; //morgan es para ver las respuestas que se realizan 
import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

const app= express();

//Middleware
app.use(morgan('dev')); 
app.use(cookieParser())
app.use(express.json()) // Si llega un dato en forma json se converitra en un objeto de javascript
app.use(express.urlencoded({express:false}))  


//Routes
app.get('/',(req,res)=>res.json({
    message: "Welcome to my API"
}))  //Cuanfo visite la ruta inicial me de este objeto json

app.use('/api',taskRoutes); //importando las rutas
app.use('/api',authRoutes);

//Error Hander
app.use((err,req,res,next)=>{
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app;

