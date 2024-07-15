import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductsRoutes } from './routes'

export const BanckApp = () => {
    return (
        <Routes>
            {
                <Route path="/*" element={<ProductsRoutes />} />
            }
        </Routes>
    )
}
