'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs"
import EditableImage from "@/components/layout/EditableImage"

export default function profilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    
    useEffect(() => {
        if (status === 'authenticated') {
            // setUserName(session.data.user.name);
            // setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserName(data.name);
                    setImage(data.image)
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setCity(data.city);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
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
                    phone,
                    streetAddress,
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

    if (status === 'loading' || !profileFetched) {
        return 'Cargando datos de usuario...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
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