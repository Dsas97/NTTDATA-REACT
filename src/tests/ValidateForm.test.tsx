import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProductRegister } from '../components';
import { ProductContext } from '../context';


const mockProductContext = {
    productList: [],
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

const mockProductForm = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
};

const mockProductSelected = {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    logo: 'logo1.png',
    date_release: '2021-01-01',
    date_revision: '2021-06-01',
};

describe('ProductRegister', () => {
    it('updates input values on change', () => {
        const { getByPlaceholderText } = render(
            <ProductContext.Provider value={mockProductContext}>
                <ProductRegister productSelected={mockProductSelected} creatMode={true} />
            </ProductContext.Provider>
        );

        const inputElement = getByPlaceholderText('ID') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: '12345' } });
        expect(mockProductContext.setErrors).not.toHaveBeenCalled();
        expect(inputElement.value).toBe('12345');
    });
    it('validates the form and sets errors for empty fields', () => {
        const { getByText } = render(
            <ProductContext.Provider value={mockProductContext}>
                <ProductRegister productSelected={mockProductSelected} creatMode={true} />
            </ProductContext.Provider>
        );

        const submitButton = getByText(/Crear/i);

        fireEvent.click(submitButton);

        expect(mockProductContext.setErrors).not.toHaveBeenCalled();
    });

    it('submits the form when all fields are valid', () => {
        const { getByText, getByPlaceholderText } = render(
            <ProductContext.Provider value={mockProductContext}>
                <ProductRegister productSelected={mockProductSelected} creatMode={true} />
            </ProductContext.Provider>
        );

        const idInput = getByPlaceholderText('ID') as HTMLInputElement;
        const descriptionInput = getByPlaceholderText('Descripción') as HTMLInputElement;
        const logoInput = getByPlaceholderText('Logo') as HTMLInputElement;
        const submitButton = getByText(/Crear/i);

        fireEvent.change(idInput, { target: { value: '12345' } });
        fireEvent.change(descriptionInput, { target: { value: 'A product description' } });
        fireEvent.change(logoInput, { target: { value: 'logo.png' } });

        fireEvent.click(submitButton);

        expect(mockProductContext.handlerAddProduct).toHaveBeenCalled();
    });
});
