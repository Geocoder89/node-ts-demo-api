import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";
import {createUser} from '../services/user.service'
import { createUserInput } from "../schema/user.schema";
import {omit} from 'lodash'

const createUserHandler = async (req:Request<{},{},createUserInput["body"]>,res: Response,next: NextFunction)=> {

    try {
         const user = await createUser(req.body)  //call create user service
         return res.status(201).json({
            success: true,
            Message: 'User is created',
            data: user
         })
    } catch (error:any) {
        log.error(error)
        return res.status(409).send(error.message)
    }
}


export default createUserHandler