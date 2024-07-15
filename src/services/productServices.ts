import axios from "axios";
import { ProductType } from "../types";
import { handleApiError } from "../utils";

const BASE_URL = '/bp/products';


export const getProductsBP = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const saveProductsBP = async (
    body: ProductType
) => {
    try {
        const response = await axios.post(BASE_URL, body);
        return response.data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const updateProductsBP = async (
    productId: string,
    body: ProductType
) => {
    try {
        const response = await axios.put(`${BASE_URL}/${productId}`, body);
        return response.data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const deleteProductBP = async (
    productId: string,
) =>{
    try{
        const response = await axios.delete(`${BASE_URL}/${productId}`);
        return response.data.data;
    }catch(error){
        handleApiError(error);
        throw error;
    }
}

export const verificationProductBP = async (
    productId: string,
) =>{
    try{
        const response =  await axios.get(`${BASE_URL}/verification/${productId}`);
        return response.data;
    }catch(error){
        handleApiError(error);
        throw error;
    }
}