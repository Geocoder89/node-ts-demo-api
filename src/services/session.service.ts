
import SessionModel, { SessionDocument } from "../models/session.model"
import {FilterQuery,UpdateQuery} from 'mongoose'
import { signJWt, verifyJwt } from "../utils/jwt.utils"
import { get } from "lodash"
import { findUser } from "./user.service"
import config from "config"

const createSession = async(userId: string,userAgent: string)=> {
    const session = await SessionModel.create({user: userId,userAgent})

    return session.toJSON()
}

const findSessions = async(query: FilterQuery<SessionDocument>)=> {
    return SessionModel.find(query).lean();
}


const updateSessions = async(query: FilterQuery<SessionDocument>,update: UpdateQuery<SessionDocument>) => {
    return SessionModel.updateOne(query,update)
}


const reissueAccessToken = async({refreshToken}:{refreshToken: string})=> {
    const {decoded} = verifyJwt(refreshToken,'refreshTokenPublicKey')

    if(!decoded || !get(decoded,'session')) {
        return false;
    }

    const session = await SessionModel.findById(get(decoded,"session"))

    if(!session || !session.valid) {
        return false;
    }

    const user = await findUser({_id: session.user})
    if(!user) {
        return false
    }


     // create an access token

     const accessToken = signJWt({
        ...user,
        session: session._id,
    },"accessTokenPrivateKey",
        {
            expiresIn: config.get<string>('accessTokenTtl') //15 minutes
        }
    )

    return accessToken
}
  
export {createSession,findSessions,updateSessions,reissueAccessToken}