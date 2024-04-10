'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function profilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const {status} = session;
    
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setCity(data.city);
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName,
                    image,
                    streetAddress,
                    phone,
                    city,
                }),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Guardando...',
            success: 'Perfil guardado',
            error: 'Error',
        })
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            
            
            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: 'data',
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setImage(link);
                    })
                }
                throw new Error('Algo salió mal');
            });

            await toast.promise(uploadPromise, {
                loading: 'Subiendo...',
                success: 'Subida completa',
                error: 'Error de subida',
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
                <div className="flex gap-2">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-xs">
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
                        <label>
                            Nombres y apellidos
                        </label>
                        <input
                            type="text" placeholder="Nombre y apellidos" 
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        />
                        <label>
                            Correo
                        </label>
                        <input
                            type="email" disabled={true}
                            value={session.data.user.email}
                            placeholder={'email'}
                        />
                        <label>
                            Teléfono
                        </label>
                        <input
                            type="tel" placeholder= "Telefono"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />
                        <label>
                            Dirección
                        </label>
                        <input
                            type="text" placeholder= "Dirección"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <label>
                            Ciudad
                        </label>
                        <input
                            type="text" placeholder= "Ciudad"
                            value={city} onChange={ev => setCity(ev.target.value)}
                        />
                        <button type="submit">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}