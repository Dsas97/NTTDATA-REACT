interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ProductListPagination: React.FC<PaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    paginate,
    handleItemsPerPageChange
}) => {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                {Array.from({ length: pageNumbers }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers}>
                    Siguiente
                </button>
            </div>

            <div className="items-per-page">
                <label htmlFor="itemsPerPage">Registros por página:</label>
                <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </>
    );
};
