import { NextFunction, Request,Response } from "express";
import {get} from 'lodash'
import { verifyJwt } from "../utils/jwt.utils";
const deserializeUser = async (req: Request,res:Response,next:NextFunction)=>{

    // we get the access to the access token by removing the bearer keyword from what returns from the req.headers.authorization
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );

    console.log('access token is',accessToken)


    if(!accessToken) {
        return next()
    }

    const {decoded,expired} = verifyJwt(accessToken,"accessTokenPublicKey")
    console.log('decoded',decoded)
    console.log('expired',expired)
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }

    return next();
}


export default deserializeUser