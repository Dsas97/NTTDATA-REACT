import React, { ReactNode } from 'react'
import { useProducts } from '../hooks/useProducts';
import { ProductContext } from './ProductsContext';

interface ProductsProviderProps {
    children: ReactNode; 
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const {
        productList,
        productSelected,
        initialProductForm,
        errors,
        setErrors,
        handlerProductSelected,
        getAllProducts,
        handlerAddProduct,
        handlerDeleteProduct,
        handlerCloseForm,
        notification,
        setNotification
    } = useProducts();

    return (
        <ProductContext.Provider
            value={{
                productList,
                productSelected,
                initialProductForm,
                errors,
                setErrors,
                handlerProductSelected,
                getAllProducts,
                handlerAddProduct,
                handlerDeleteProduct,
                handlerCloseForm,
                notification,
                setNotification
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
