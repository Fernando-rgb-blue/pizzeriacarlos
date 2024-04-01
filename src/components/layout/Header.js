"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const session = useSession();
    console.log(session);
    const status = session.status;
    return (
        <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold mr-1">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            PIZZERÍA CARLO'S
          </Link>
          <Link href={'/'}>Inicio</Link>
          <Link href={''}>Menú</Link>
          <Link href={''}>Nosotros</Link>
          <Link href={''}>Contactos</Link>
        </nav>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold ml-1">
          {status === 'authenticated' && (
            <button
              onClick = {() => signOut()}
              className="bg-primary rounded-full
            text-white px-8 py-2">
              Cerrar sesión
            </button>
          )}
          {status !== 'authenticated' && (
            <>
              <Link href={'/login'}>Ingresar</Link>
              <Link href={'/register'} className="bg-primary rounded-full
              text-white px-8 py-2">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </header>
    );
}