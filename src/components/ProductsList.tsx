import React, { useState } from "react";
import { ProductType } from "../types";
import { ProductListPagination } from "./ProductListPagination";
import { ProductListRow } from "./ProductListRow";

interface ProductsProps {
    productList: ProductType[];
}


export const ProductsList: React.FC<ProductsProps> = ({
    productList
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = productList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Nombre del Producto</th>
                            <th>Descripción</th>
                            <th>Fecha de Liberación</th>
                            <th>Fecha de Reestructuración</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductListRow currentProducts={currentProducts} />
                    </tbody>
                </table>
                <div className="table-footer">
                    <span>Resultados: {productList.length}</span>
                    <ProductListPagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={productList.length}
                        paginate={paginate}
                        handleItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            </div>
        </>
    )
}
