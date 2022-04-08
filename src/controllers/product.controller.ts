import { NextFunction, Request, Response } from "express";
import { createProductInput, updateProductInput } from "../schema/product.schema";
import { createProduct, findAndDeleteProduct, findAndUpdateProduct, findProduct } from "../services/product.service";

const createProductHandler = async(req:Request<{},{},createProductInput["body"]>,res: Response,next: NextFunction)=> {

    const userId = res.locals.user._id
    const body = req.body

    const product = await createProduct({
        ...body,
        user: userId
    })

    return res.status(201).json({
        success: true,
        message: 'Product successfully created',
        data: product
    })
}


const updateProductHandler = async(req:Request<updateProductInput['params']>,res: Response,next: NextFunction)=> {
    const userId = res.locals.user._id

    const productId = req.params.productId
    const updatedBody = req.body
    const product = await findProduct({productId})

    if(!product) {
        return res.sendStatus(404)
    }

    if(String(product.user) !== userId) {
        return res.sendStatus(403)
    }

    const updatedProduct = await findAndUpdateProduct({productId},updatedBody,{
        new: true,
        runValidators: true
    })

    return res.status(200).json({
        success: true,
        message: 'Product Updated Successfully',
        data: updatedProduct
    })
}



const getProductHandler = async(req:Request<updateProductInput['params']>,res: Response,next: NextFunction)=> {
    
    const productId = req.params.productId

    const product = await findProduct({productId})

    if(!product ) {
        return res.sendStatus(404)
    }


    res.status(200).json({
        success: true,
        data: product
    })
    
}


const deleteProductHandler = async(req:Request<updateProductInput['params']>,res: Response,next: NextFunction)=> {
    
    const userId = res.locals.user._id

    const productId = req.params.productId
    const product = await findProduct({productId})

    if(!product) {
        return res.sendStatus(404)
    }

    if(String(product.user) !== userId) {
        return res.sendStatus(403)
    }

    await findAndDeleteProduct({productId})

    res.status(200).send({
        message: 'Product deleted successflly',
        data: {}
    })
}


export {createProductHandler,getProductHandler,updateProductHandler,deleteProductHandler}