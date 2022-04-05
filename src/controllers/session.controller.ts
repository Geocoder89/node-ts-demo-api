import { Request, Response } from "express";
import {createSession, findSessions} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWt } from "../utils/jwt.utils";
import config from 'config'
const createUserSessionHandler = async (req: Request,res: Response)=> {


    //  validate the user's password

    const user = await validatePassword(req.body)


    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'invalid email or password entered'
        })
    }


    // create a session

    const session = await createSession(user._id, req.get("user-agent")|| "")

    // create an access token

    const accessToken = signJWt({
        ...user,
        session: session._id,
    },"accessTokenPrivateKey",
        {
            expiresIn: config.get<string>('accessTokenTtl') //15 minutes
        }
    )




    // create a refresh token


    const refreshToken = signJWt({
        ...user,
        session: session._id,
    },"refreshTokenPrivateKey",
        {
            expiresIn: config.get<string>('refreshTokenTtl') //1
        }
    )




    // return access and refresh token

    return res.send({accessToken,refreshToken})
}

const getUserSessionsHandler = async(req: Request,res: Response)=> {
        const userId = res.locals.user._id

        console.log(userId)

        const sessions = await findSessions({user: userId,valid: true})
        console.log('sessions are',{sessions})

        return res.send(sessions)
}


export {createUserSessionHandler,getUserSessionsHandler}