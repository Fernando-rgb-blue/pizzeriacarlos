'use client';
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
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
            error: 'Error al guardar'
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
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    );
}