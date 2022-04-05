
import {Express,Request,Response,NextFunction} from 'express'
import { createUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller'
import createUserHandler from './controllers/user.controller'
import requireUser from './middleware/requireUser'
import validate from './middleware/validateResource'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'
const routes = (app: Express)=> {


    app.get("/healthcheck",(req: Request,res: Response,next: NextFunction)=>res.sendStatus(200))

    app.post('/api/users',validate(createUserSchema),createUserHandler)
    app.post('/api/sessions',validate(createSessionSchema),createUserSessionHandler)

    app.get("/api/sessions", requireUser, getUserSessionsHandler);
}


export default routes