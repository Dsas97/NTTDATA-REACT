import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductContext } from '../context';
import { ProductsPage } from '../pages';

// Mock del contexto de productos
const mockProductContext = {
    productList: [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: '', date_release: '', date_revision: '' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: '', date_release: '', date_revision: '' },
        { id: '3', name: 'Another Product', description: 'Another Description', logo: '', date_release: '', date_revision: '' }
    ],
    getAllProducts: jest.fn(),
    notification: null,
    setNotification: jest.fn(),
    productSelected: {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
    },
    initialProductForm: {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
    },
    errors: {},
    setErrors: jest.fn(),
    handlerProductSelected: jest.fn(),
    handlerAddProduct: jest.fn(),
    handlerDeleteProduct: jest.fn(),
    handlerCloseForm: jest.fn()
};

describe('ProductsPage', () => {
    test('filters products based on search term', async () => {
        render(
            <ProductContext.Provider value={mockProductContext}>
                <BrowserRouter>
                    <ProductsPage />
                </BrowserRouter>
            </ProductContext.Provider>
        );

        // Simular la búsqueda por el nombre de 'Product 1'
        const searchInput = screen.getByPlaceholderText('Buscar productos por nombre...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });

        // Esperar a que se actualice la lista filtrada
        await waitFor(() => {
            // Verificar que 'Product 1' esté en la lista filtrada
            const product1 = screen.getByText(/Product 1/i);
            expect(product1).toBeInTheDocument();

            // Verificar que 'Product 2' no esté en la lista filtrada
            expect(() => screen.getByText(/Product 2/i)).toThrow();
        });
    });
});
