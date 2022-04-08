import {DocumentDefinition,FilterQuery} from 'mongoose'
import User, { UserDocument } from '../models/user.model';
import {omit} from 'lodash'

const createUser = async (input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>)=>{

    try {
        const user = await User.create(input)
        return omit(user.toJSON(),'password')
    } catch (error:any) {
        throw new Error(error)
    }
}

const validatePassword = async ({email,password}:{email:string,password: string})=> {

    const user = await User.findOne({email})

    if(!user) {
        return false
    }

    const isValid = await user.comparePassword(password)

    if(!isValid) return false
    return omit(user.toJSON(),'password')
} 

const findUser = (query:FilterQuery<UserDocument>)=> {
    return User.findOne(query).lean()
}


export {createUser,validatePassword,findUser}