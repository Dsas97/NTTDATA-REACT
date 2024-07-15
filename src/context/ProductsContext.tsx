import { createContext } from "react";
import { ProductContextType } from "../types";

export const ProductContext = createContext<ProductContextType>({
    productList: [],
    productSelected: {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
    },
    initialProductForm: {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
    },
    errors: {},
    setErrors: () => {},
    handlerProductSelected: () => { },
    getAllProducts: async () => { },
    handlerAddProduct: async () => { },
    handlerDeleteProduct: () => { },
    handlerCloseForm: () => { },
    notification: '',
    setNotification: () => {},
});