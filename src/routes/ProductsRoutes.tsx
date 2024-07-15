import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductsPage, RegisterProductPage } from '../pages'
import { ProductsProvider } from '../context'

export const ProductsRoutes = () => {
    return (
        <>
            <ProductsProvider>
                <Routes>
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/register" element={<RegisterProductPage />} />
                    <Route path="products/edit/:id" element={<RegisterProductPage />} />
                    <Route path="/" element={<Navigate to="/products" />} />
                </Routes>
            </ProductsProvider>
        </>
    )
}
