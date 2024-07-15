import { ErrorType } from "./error.type";
import { ProductType } from "./product.type";

export type ProductContextType = {
    productList: ProductType[];
    productSelected: ProductType;
    initialProductForm: ProductType;
    errors: ErrorType;
    setErrors:  React.Dispatch<React.SetStateAction<ErrorType>>;
    handlerProductSelected: (product: ProductType) => void;
    getAllProducts: () => Promise<void>;
    handlerAddProduct: (createMode: boolean, product: ProductType) => Promise<void>;
    handlerDeleteProduct: (id: string) => void;
    handlerCloseForm: () => void,
    notification: string | null,
    setNotification: React.Dispatch<React.SetStateAction<string | null>>
}