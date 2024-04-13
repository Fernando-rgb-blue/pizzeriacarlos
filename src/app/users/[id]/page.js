'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const [user, setUser] = useState(null);
    const {loading, data} = useProfile();
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user);
            });
        });
    }, []);

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id:id})
            });
            if (res.ok)
                resolve();
            else
                reject();
        });

        toast.promise(promise, {
            loading: 'Guardando usuario...',
            success: 'Usuario guardado',
            error: 'Ha ocurrido un error. Intente más tarde.'
        });
    }

    if (loading) {
        return 'Cargando datos de usuario...';
    }

    if (!data.admin) {
        return 'No posees roles de administrador.';
    }

    return (
        <section className="mt-8 mx-auto max-w-xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}