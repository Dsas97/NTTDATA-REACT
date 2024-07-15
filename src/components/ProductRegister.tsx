import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context';
import { ProductType } from '../types';
import { ProductForm } from './ProductForm';

export type ProductRegisterProps = {
    productSelected: ProductType
    creatMode: boolean
}


export const ProductRegister: React.FC<ProductRegisterProps> = ({ 
    productSelected,
    creatMode
}) => {

    const { initialProductForm, handlerAddProduct, setErrors } = useContext(ProductContext);
    const [productForm, setProductForm] = useState(initialProductForm);

    useEffect(() => {
        setProductForm({
            ...productSelected,
        })
    }, [productSelected])

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductForm({
            ...productForm,
            [name]: value,
        })
    }

    const validateForm = () => {
        let isValid = true;
        if (productForm.id === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                id: 'El campo ID es requerido.',
            }));
            isValid = false;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                id: '',
            }));
        }
        if (productForm.description === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                description: 'El campo Descripción es requerido.',
            }));
            isValid = false;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                description: '',
            }));
        }
        if (productForm.logo === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                logo: 'El campo Logo es requerido.',
            }));
            isValid = false;
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                logo: '',
            }));
        }
        return isValid;
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm())
            return
        handlerAddProduct(creatMode, productForm);
    }

    return (
        <ProductForm
            productForm = {productForm}
            onInputChange = {onInputChange}
            setProductForm = {setProductForm}
            onSubmit = {onSubmit}
            creatMode = {creatMode}
        />
    )
}
