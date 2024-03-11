import bcrypt from 'bcrypt'

import {pool} from '../db.js'

export const signin=(req,res)=>res.send('ingresando')

//----------------------------------------------------
//registrando
export const sigup=async(req,res)=>{
    const {name, email, password} = req.body
    
    try{
        const hashedPassword=await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        const result=await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) Returning *',[name, email, hashedPassword])

        console.log(result);
        return res.json(result.rows[0])
    }catch(error){
        if(error.code=='23505'){
            return res.status(400).json({
                message:"El email ya esta registrando"
            })
        }
    }
}

//----------------------------------------------------
export const signout=(req,res)=>res.send('creando sesion')

export const profile=(req,res)=>res.send('perfil de usaurio')