import jwt from 'jsonwebtoken'
import config from 'config'






const signJWt = (
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
    )=> {

        const signingKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii")

     

    return jwt.sign(object,signingKey,{
        ...(options && options),
        algorithm: "RS256"
       
    })
}


const verifyJwt = (token: string,keyName: "accessTokenPublicKey")=>{


    const publicKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii")

  
    try {
        const decoded = jwt.verify(token,publicKey)

      
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error:any) {
       
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}

export {signJWt,verifyJwt}