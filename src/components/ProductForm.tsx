import React, { useContext, useEffect, useState } from 'react'
import { ProductType } from '../types'
import { ProductContext } from '../context'
import { useDate } from '../hooks'
import { handleApiError } from '../utils'
import { verificationProductBP } from '../services'

export type ProductFormProps = {
  productForm: ProductType
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setProductForm: React.Dispatch<React.SetStateAction<ProductType>>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  creatMode: boolean
}


export const ProductForm: React.FC<ProductFormProps> = ({
  productForm,
  onInputChange,
  setProductForm,
  onSubmit,
  creatMode
}) => {

  const { errors, setErrors, handlerCloseForm, initialProductForm } = useContext(ProductContext);
  const { getCurrentDate, calculateRevisionDate } = useDate();
  const [disabled, setDisabled] = useState(false);

  const handleReleaseDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProductForm({
      ...productForm,
      date_release: value,
      date_revision: calculateRevisionDate(new Date(value))
    });
  };

  const handleResetForm = () => {
    setProductForm(initialProductForm);
    handlerCloseForm();
  }

  useEffect(() => {
    const handleVerifiyId = async (id: string) => {
      try {
        const result = await verificationProductBP(id);
        if (result) {
          setDisabled(true)
          setErrors(prevErrors => ({
            ...prevErrors,
            id: 'El id ya existe',
          }));
        }
        else {
          setDisabled(false)
          setErrors(prevErrors => ({
            ...prevErrors,
            id: '',
          }));
        }
      } catch (error) {
        handleApiError(error);
      }
    }
    if(creatMode){
      if (productForm.id && productForm.id !== '') {
        handleVerifiyId(productForm.id);
      }
    }
  }, [productForm.id, creatMode, setErrors])

  return (
    <form onSubmit={onSubmit} className="form-group" data-testid="product-form">
      <div className="input-container">
        <input
          className="form-control"
          placeholder="ID"
          name="id"
          maxLength={10}
          disabled = {!creatMode}
          value={productForm.id}
          onChange={onInputChange}
        />
        {errors.id && <p className="text-danger">{errors.id}</p>}
      </div>
      <div className="input-container">
        <input
          className="form-control"
          placeholder="Nombre"
          name="name"
          maxLength={100}
          value={productForm.name}
          onChange={onInputChange}
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="input-container">
        <input
          className="form-control"
          placeholder="Descripción"
          name="description"
          maxLength={200}
          value={productForm.description}
          onChange={onInputChange}
        />
        {errors.description && <p className="text-danger">{errors.description}</p>}
      </div>
      <div className="input-container">
        <input
          className="form-control"
          placeholder="Logo"
          name="logo"
          value={productForm.logo}
          onChange={onInputChange}
        />
        {errors.logo && <p className="text-danger">{errors.logo}</p>}
      </div>
      <div className="input-container">
        <input
          className="form-control"
          type='date'
          placeholder="Fecha Liberación"
          name="date_release"
          value={productForm.date_release}
          onChange={handleReleaseDateChange}
          min={getCurrentDate()}
        />
        {errors.date_release && <p className="text-danger">{errors.date_release}</p>}
      </div>
      <div className="input-container">
        <input
          className="form-control"
          type='date'
          placeholder="Fecha Revisión"
          name="date_revision"
          readOnly
          value={productForm.date_revision}
          onChange={onInputChange}
        />
        {errors.date_revision && <p className="text-danger">{errors.date_revision}</p>}
      </div>
      <div className="button-container">
        <button
          type="button"
          className="button-form button-reset"
          onClick={handleResetForm}
        >
          Reiniciar
        </button>
        <button
          className="button-form"
          type="submit"
          disabled={disabled}
        >
          {creatMode === false ? 'Editar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
