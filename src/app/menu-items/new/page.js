'use client';
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {image, name, description, basePrice};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Guardando ítem para el menú...',
            success: 'Guardado',
            error: 'Error'
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Cargando datos de usuario...';
    }

    if (!data.admin) {
        return 'No posees roles de administrador.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Mostrar todos los ítems</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Nombre en el menú</label>
                        <input
                            type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label>Descripción</label>
                        <input
                            type="text"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        <label>Precio inicial</label>
                        <input
                            type="text"
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)}
                        />
                        <button type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        </section>
    );
}