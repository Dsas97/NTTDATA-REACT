import { ProductType } from "./product.type"

export type ErrorType = {
    [key: string]: string;
};

export type ErrorTypeResponse = {
    name: string;
    message: string;
    stack: string;
    errors: {
        target: ProductType;
        value: string;
        property: string;
        children: any[];
        constraints: {
            [key: string]: string;
        };
    }[];
}
