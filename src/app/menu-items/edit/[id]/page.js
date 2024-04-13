'use client';
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE'
            });
            if (res.ok)
                resolve();
            else
                reject();
        })

        await toast.promise(promise, {
            loading: 'Borrando...',
            success: 'Borrado',
            error: 'Error'
        })

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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="max-w-xs mx-auto mt-6">
                <DeleteButton
                    label="Borrar este ítem"
                    onDelete={handleDeleteClick} />
            </div>
        </section>
    );
}