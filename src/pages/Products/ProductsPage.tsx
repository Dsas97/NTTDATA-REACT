"use client";
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { ProductContext } from '../../context';
import { ProductType } from '../../types';
import { ProductLoading } from '../../components';

export type ProductsProps = {
}

export const ProductsPage: React.FC<ProductsProps> = () => {

	const {
		productList,
		getAllProducts,
		notification,
		setNotification
	} = useContext(ProductContext);
	const [loading, setLoading] = useState(true);
	const [productFoundList, setProductFoundList] = useState<ProductType[]>([])
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		getAllProducts();
	}, [])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const searchProducts = () => {
			const filteredProducts = productList.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setProductFoundList(filteredProducts);
		}
		if (productList.length > 0) {
			searchProducts()
		}
	}, [searchTerm])

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [notification, setNotification]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, [productList]);

	return (
		<>
			<div className="container">
				{notification && (
					<div className={`notification ${notification.includes('Error') ? 'error' : 'success'}`}>
						{notification}
					</div>
				)}
				<div className="row">
					<div className="col">
						<div className="search-container">
							<input
								type="text"
								className="search-input"
								placeholder="Buscar productos por nombre..."
								onChange={handleSearchChange}
							/>
							<NavLink className="button" to="/products/register">Agregar</NavLink>
						</div>
						{loading ? (
							<ProductLoading />
						) : (
							<>
								{productList.length === 0 ? (
									<div className="alert alert-warning">
										No hay productos en el sistema
									</div>
								) : (
									<>
										{searchTerm === '' ? (
											<ProductsList productList={productList} />
										) : (
											<ProductsList productList={productFoundList} />
										)}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
