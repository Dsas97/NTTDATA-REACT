import React from 'react';

type ProductDialogProps = {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export const ProductDialog: React.FC<ProductDialogProps> = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="confirmation-dialog">
            <div className="dialog-content">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button className="btn-cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

;
