
import {Express,Request,Response,NextFunction} from 'express'
import { createProductHandler, getProductHandler, updateProductHandler,deleteProductHandler } from './controllers/product.controller'
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controllers/session.controller'
import createUserHandler from './controllers/user.controller'
import requireUser from './middleware/requireUser'
import validate from './middleware/validateResource'
import { createSessionSchema } from './schema/session.schema'

import {createProductSchema, getProductSchema, updateProductSchema} from './schema/product.schema'
import { createUserSchema } from './schema/user.schema'
const routes = (app: Express)=> {


    app.get("/healthcheck",(req: Request,res: Response,next: NextFunction)=>res.sendStatus(200))

    app.post('/api/users',validate(createUserSchema),createUserHandler)
    app.post('/api/sessions',validate(createSessionSchema),createUserSessionHandler)

    app.get("/api/sessions", requireUser, getUserSessionsHandler);



    app.delete("/api/sessions", requireUser, deleteSessionHandler);


    app.post('/api/products',[requireUser,validate(createProductSchema)],createProductHandler)

    app.put('/api/products/:productId',[requireUser,validate(updateProductSchema)],updateProductHandler)

    app.get("/api/products/:productId",validate(getProductSchema),getProductHandler)

    app.delete('/api/products/:productId',[requireUser,validate(getProductSchema)],deleteProductHandler)
}


export default routes