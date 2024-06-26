"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {email, password, callbackUrl: '/'});
        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Inicia sesión
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="Correo electrónico" value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" name="password" placeholder="Contraseña" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)} />
                <button disabled={loginInProgress} type="submit">Ingresar</button>
                <div className="my-4 text-center text-gray-500">
                    o continúe con
                </div>
                <button 
                    type="button"
                    disabled={loginInProgress}
                    onClick={() => {
                        signIn('google', {callbackUrl:'/'});
                        setLoginInProgress(true);
                    }}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''}
                    width={24} height={24} />
                    Ingresa con Google
                </button>
                <div className="my-4 text-center text-gray-800 underline cursor-pointer">
                    ¿Olvidaste tu contraseña?
                </div>
            </form>
        </section>
    );
}