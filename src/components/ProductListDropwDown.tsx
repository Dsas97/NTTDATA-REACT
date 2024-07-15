import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../context';
import { ProductDialog } from './ProductDialog';
import { ProductType } from '../types';

export type ProductListDropwDownProps = {
    product: ProductType
}


export const ProductListDropwDown: React.FC<ProductListDropwDownProps> = ({ product }) => {

    const { handlerDeleteProduct } = useContext(ProductContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const onRemoveProduct = () => {
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const confirmDelete = (id: string) => {
        handlerDeleteProduct(id);
        setShowConfirmation(false);
    };

    return (
        <div className="dropdown">
            <button className="dropbtn">...</button>
            <div className="dropdown-content">
                <NavLink to={'/products/edit/' + product.id}>Editar</NavLink>
                <button
                    className="dropdown-content-item"
                    onClick={() => onRemoveProduct()}
                >
                    Eliminar
                </button>
            </div>
            {showConfirmation && (
                <ProductDialog
                    message={"¿Estás seguro de que deseas eliminar este producto " + product.name + '?'}
                    onCancel={cancelDelete}
                    onConfirm={() => confirmDelete(product.id)}
                />
            )}
        </div>
    )
}
