import { useState } from "react";

export default function DeleteButton({label, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/60 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        ¿Estás seguro?
                    </div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => setShowConfirm(false)}>
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                            type="button"
                            className="primary">
                            Sí,&nbsp;borrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button className="bg-red-600 text-white font-bold" type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}