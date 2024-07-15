import { ActionsEnum } from "../enum";
import { ProductType } from "./product.type";


export interface AddProductAction {
    type: typeof ActionsEnum.ADD_PRODUCT;
    payload: ProductType;
}

export interface UpdateProductAction {
    type: typeof ActionsEnum.UPDATE_PRODUCT;
    payload: {
        productId: string;
        updatedData: Partial<ProductType>;
    };
}

export interface DeleteProductAction {
    type: typeof ActionsEnum.DELETE_PRODUCT;
    payload: string;
}

export interface LoadingProducts {
    type: typeof ActionsEnum.LOADING_PRODUCT;
    payload: ProductType[];
}

export type ProductActionTypes = AddProductAction | UpdateProductAction | DeleteProductAction | LoadingProducts;