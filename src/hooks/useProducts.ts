import { useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ActionsEnum } from '../enum';
import { productReducer } from '../reducers';
import { deleteProductBP, getProductsBP, saveProductsBP, updateProductsBP } from '../services';
import { ErrorTypeResponse, ProductState, ProductType } from '../types';
import { handleApiError } from '../utils';

const initialState: ProductState = {
    products: [],
};

const initialProductForm: ProductType = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
}

const initialErrors: { [key: string]: string } = {};

export const useProducts = () => {

    const [productList, dispatch] = useReducer(productReducer, initialState);
    const [productSelected, setProductoSelected] = useState(initialProductForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>(initialErrors);
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const result = await getProductsBP();
            dispatch({
                type: ActionsEnum.LOADING_PRODUCT,
                payload: result,
            });
        } catch (error) {
            handleApiError(error);
            setNotification('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const handlerAddProduct = async (createMode: boolean, product: ProductType) => {
        let response;
        try {
            console.log(product);
            if (createMode) {
                response = await saveProductsBP(product);
                setNotification('Producto creado exitosamente.');
            } else {
                response = await updateProductsBP(product.id, product);
                setNotification('Producto actualizado exitosamente.');
            }
            dispatch({
                type: (createMode === true) ? ActionsEnum.ADD_PRODUCT : ActionsEnum.UPDATE_PRODUCT,
                payload: response,
            });
            handlerCloseForm();
            navigate('/products');
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    const errorResponse: ErrorTypeResponse = error.response.data;
                    const formattedErrors: { [key: string]: string } = {};
                    errorResponse.errors.forEach((err) => {
                        formattedErrors[err.property] = Object.values(err.constraints)[0];
                    });
                    setNotification('Error al procesar la solicitud: ' + error);
                    setErrors(formattedErrors);
                } else if (error.response.status === 500) {
                    setNotification('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.');
                    navigate('/products');
                } else {
                    setNotification('Error al procesar la solicitud: ' + error);
                    navigate('/products');
                    throw error;
                }
            } else {
                setNotification('Error al procesar la solicitud: ' + error);
                navigate('/products');
                throw error;
            }
        }
    }
    

    const handlerDeleteProduct = (id: string) => {
        deleteProductBP(id);
        dispatch({
            type: ActionsEnum.DELETE_PRODUCT,
            payload: id,
        })
    }

    const handlerProductSelected = (product: ProductType) => {
        setProductoSelected({ ...product });
    }

    const handlerCloseForm = () => {
        setProductoSelected(initialProductForm);
        setErrors(initialErrors);
    }


    return {
        productList: productList.products,
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
    }


}
