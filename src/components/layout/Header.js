"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
    const session = useSession();
    // console.log(session);
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext);
    if (userName && userName.includes(' ')) {
      userName = userName.split(' ')[0];
    }
    return (
        <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold mr-1">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            PIZZERÍA CARLO'S
          </Link>
          <Link href={'/'}>Inicio</Link>
          <Link href={'menu'}>Menú</Link>
          <Link href={'/#about'}>Nosotros</Link>
          <Link href={'/#contact'}>Contactos</Link>
        </nav>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold ml-1">
          {status === 'authenticated' && (
            <>
              <Link href={'/profile'} className="whitespace-nowrap">
                Hola, {userName}
              </Link>
              <button
                onClick = {() => {signOut({callbackUrl: '/', redirect: true})}}
                className="bg-primary rounded-full text-white px-8 py-2">
                Cerrar&nbsp;sesión
              </button>
            </>
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
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </header>
    );
}