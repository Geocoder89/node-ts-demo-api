import { NextFunction, Request,Response } from "express";
import {get} from 'lodash'
import { reissueAccessToken } from "../services/session.service";
import { verifyJwt } from "../utils/jwt.utils";
const deserializeUser = async (req: Request,res:Response,next:NextFunction)=>{

    // we get the access to the access token by removing the bearer keyword from what returns from the req.headers.authorization same as the refresh token
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );


    const refreshToken = get(req,"headers.x-refresh")
   


    if(!accessToken) {
        return next()
    }

    const {decoded,expired} = verifyJwt(accessToken,"accessTokenPublicKey")
    
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }


    if(expired && refreshToken) {
        const newAccessToken = await reissueAccessToken({refreshToken})

        if(newAccessToken) {
            res.setHeader('x-access-token',newAccessToken)
        }

        const result = verifyJwt(newAccessToken as string,"accessTokenPublicKey")

        res.locals.user = result.decoded;
        return next()
        
    }

    return next();
}


export default deserializeUser