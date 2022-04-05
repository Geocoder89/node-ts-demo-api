
import SessionModel, { SessionDocument } from "../models/session.model"
import {FilterQuery} from 'mongoose'

const createSession = async(userId: string,userAgent: string)=> {
    const session = await SessionModel.create({user: userId,userAgent})

    return session.toJSON()
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}
  
export {createSession}