import { ActionsEnum } from "../enum";
import { ProductActionTypes, ProductState } from "../types";

const initialState: ProductState = {
    products: [],
};

export const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case ActionsEnum.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case ActionsEnum.UPDATE_PRODUCT:
            const { productId, updatedData } = action.payload;
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === productId ? { ...product, ...updatedData } : product
                ),
            };
        case ActionsEnum.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        case ActionsEnum.LOADING_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};
