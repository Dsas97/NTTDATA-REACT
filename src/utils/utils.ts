import axios from 'axios';
import { ServerResponseType } from '../types';

export function handleApiError(error: any): ServerResponseType {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return {
                status: error.response.status,
                statusText: error.response.data,
            };
        } else {
            return {
                status: 500,
                statusText: 'Error Del Servidor: ' + error.message,
            };
        }
    }
    return {
        status: 500,
        statusText: 'Internal Server Error',
    };
}