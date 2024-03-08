import express from 'express';
import morgan from 'morgan'; //morgan es para ver las respuestas que se realizan 

const app= express();

app.use(morgan('dev')); 

app.use(express.json()) // Si llega un dato en forma json se converitra en un objeto de javascript
app.use(express.urlencoded({express:false}))  

app.get('/',(req,res)=>res.json({
    message: "Welcome to my API"
}))  //Cuanfo visite la ruta inicial me de este objeto json


app.get('/test',(req,res)=>{
    throw new Error('error de conexion'); //Simulo un error
    res.send('test')
})

app.use((err,req,res,next)=>{
    res.status(500).json({
        status: "error",
        message: err.message
    })
})//Esto es un middleware

export default app;

