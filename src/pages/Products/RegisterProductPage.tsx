import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context';
import { useParams } from 'react-router-dom';
import { ProductRegister } from '../../components';

export type RegisterProduct = {
}


export const RegisterProductPage: React.FC<RegisterProduct> = () => {

    const { productList = [], initialProductForm } = useContext(ProductContext);
    const [productSelected, setProductSelected] = useState(initialProductForm);
    const [creatMode, setCreateMode] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        if (id) {
            const product = productList.find(u => u.id === id) || initialProductForm;
            setProductSelected(product);
            setCreateMode(false);
        } else {
            setCreateMode(true);
        }
    }, [id])

    return (
        <div className="container">
            <h4>{productSelected.id !== '' ? 'Formulario de Edición' : 'Formulario de Registro '}</h4>
            <div className="row">
                <div className="col">
                    <ProductRegister
                        productSelected={productSelected}
                        creatMode={creatMode}
                    />
                </div>
            </div>
        </div>
    )
}
