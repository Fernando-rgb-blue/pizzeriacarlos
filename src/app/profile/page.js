'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function profilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;
    
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName}),
        });

        setIsSaving(false);
        if (response.ok) {
            setSaved(true);
        }
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
        }
    }

    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Perfil
            </h1>
            <div className="max-w-md mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
                        Perfil guardado
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
                        Guardando...
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative">
                            <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt={'avatar'} />
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}/>
                                <span className="block border border-gray-300 rounded-lg p-2 text-center font-bold cursor-pointer">
                                    Editar
                                </span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="Nombre y apellidos" 
                            value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        <input type="email" disabled={true} value={session.data.user.email}/>
                        <button type="submit">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}