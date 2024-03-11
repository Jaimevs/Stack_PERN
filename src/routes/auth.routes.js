import Router from 'express-promise-router'

import {signin,sigup,signout,profile} from "../controllers/auth.controller.js"

const router =Router();

router.post('/signin',signin)

router.post('/signup',sigup)

router.post('/signout',signout)

router.get('/porfile',profile)

export default router;
