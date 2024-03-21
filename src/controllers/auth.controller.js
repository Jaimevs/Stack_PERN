import bcrypt from 'bcrypt'

import {pool} from '../db.js'

import {createAccessToken} from '../libs/jwt.js'


//-----------------------------------------------------
//Login
export const signin=async (req,res)=>{
    const {email,password} = req.body

    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email])

    if(result.rowCount==0) {
        return res.status(400).json({
            message: 'El correo no esta registrado'
        })
    }

    const validPassword=await bcrypt.compare(password, result.rows[0].password)

    if(!validPassword){
        return res.status(400).json({
            message: 'La contraseña es incorrect'
        })
    }

    const token=await createAccessToken({id: result.rows[0].id})

    res.cookie('token',token,{
        httpOnly: true,
        //secure : true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 //1 day
    })

    return res.json(result.rows[0]);
}

//----------------------------------------------------
//registrando
export const sigup=async(req,res,next)=>{

    const {name, email, password} = req.body
    console.log(name, email, password);
    try{
        const hashedPassword=await bcrypt.hash(password, 10)
        //console.log(hashedPassword);

        const result=await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) Returning *',[name, email, hashedPassword])

        const token = await createAccessToken({id: result.rows[0].id})
        //console.log(result); 

        res.cookie('token',token,{
            httpOnly: true,
            //secure : true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 //1 day
        })

       /* return res.json({
            token: token
        });*/

        return res.json(result.rows[0])

        

    }catch(error){
        if(error.code=='23505'){
            return res.status(400).json({
                message:"El email ya esta registrando"
            })
        }
        next(error);
    }
}

//----------------------------------------------------
//cerrar sesion(eliminar la cookie de la cabecera para que no exista)
export const signout=(req,res)=>{
    res.clearCookie('token');
    res.sendStatus(200);
}


export const profile=async(req,res)=>{
    const result=await pool.query('SELECT * FROM users WHERE id=$1',[req.userId])
    return res.json(result.rows[0]);
}