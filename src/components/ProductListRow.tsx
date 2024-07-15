import React from 'react';
import { ProductType } from '../types';
import { ProductListDropwDown } from './ProductListDropwDown';

export type ProductsRowsProps = {
    currentProducts: ProductType[];
}


export const ProductListRow: React.FC<ProductsRowsProps> = ({
    currentProducts
}) => {
    return (
        <>
            {currentProducts.map((product) => (
                <tr key={product.id}>
                    <td><img src={product.logo} alt="Logo" style={{ width: '50px', height: '50px' }} /></td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.date_release}</td>
                    <td>{product.date_revision}</td>
                    <td>
                        <ProductListDropwDown product = {product} />
                    </td>
                </tr>
            ))}
        </>
    );
}
