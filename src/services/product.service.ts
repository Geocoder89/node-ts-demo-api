import ProductModel, { ProductDocument } from "../models/product.model";
import { DocumentDefinition,FilterQuery,QueryOptions,UpdateQuery} from "mongoose";
const createProduct = (
  input: DocumentDefinition<
  Omit<ProductDocument, "createdAt"| "updatedAt">>
) => {
  return ProductModel.create(input);
};

const findProduct = (query: FilterQuery<ProductDocument>,options: QueryOptions ={lean: true}) => {
    return ProductModel.findOne(query,{},options)
};

const findAndUpdateProduct = (query: FilterQuery<ProductDocument>,update: UpdateQuery<ProductDocument>,options:QueryOptions) => {
    return ProductModel.findOneAndUpdate(query,update,options)
};

const findAndDeleteProduct = (query: FilterQuery<ProductDocument>) => {
    return ProductModel.deleteOne(query)
};

export {createProduct,findAndDeleteProduct,findAndUpdateProduct,findProduct}
