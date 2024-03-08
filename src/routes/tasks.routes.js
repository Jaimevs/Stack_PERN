import { Router } from "express";

const router= Router();

router.get('/tasks',(req,res)=>res.send('obteniendo tareas'))

router.get('/tasks/:id',(req,res)=>res.send('obteniendo tarea unica'))

router.post('/tasks',(req,res)=>res.send('Creanndo Tarea'))

router.put('/tasks/:id',(req,res)=>res.send('Actualizar Tarea'))

router.delete('/tasks/:id',(req,res)=>res.send('Eliminando Tarea'))

export default router;