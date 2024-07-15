import React from 'react';

export type ProductLoadingProps = {

};

export const ProductLoading: React.FC<ProductLoadingProps> = () => {

    return (
        <div className="product-loading-container">
            <div className="product-loading-spinner"></div>
        </div>
    );
};