export type ProductType = {
    id: string
    name: string
    description: string
    logo: string
    date_release: string
    date_revision: string
}

export interface ProductState {
    products: ProductType[];
}