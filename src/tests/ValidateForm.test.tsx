import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ProductForm } from '../components';


// Mock de los props para ProductForm
const mockProductFormProps = {
    productForm: {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
    },
    onInputChange: jest.fn(),
    setProductForm: jest.fn(),
    onSubmit: jest.fn(),
    creatMode: true,
};

describe('ProductForm', () => {
    it('updates input values on change', async () => {
        const component = render(<ProductForm {...mockProductFormProps} />);
        const inputElement = component.getByPlaceholderText('ID') as HTMLInputElement;
        inputElement.value = '12345';
        inputElement.dispatchEvent(new Event('change'));
        expect(inputElement.value).toBe('12345');
    });
});
