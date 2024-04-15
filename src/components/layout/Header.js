"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Bars2 from "@/components/icons/Bars2";

function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
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
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Ingresar</Link>
        <Link href={'/register'} className="bg-primary rounded-full
        text-white px-8 py-2">
          Registrarse
        </Link>
      </>
    );
  }
}

export default function Header() {
    const session = useSession();
    // console.log(session);
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    if (userName && userName.includes(' ')) {
      userName = userName.split(' ')[0];
    }
    return (
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            PIZZERÍA CARLO'S
          </Link>
          <div className="flex gap-8 items-center">
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button className="p-1 border" onClick={() => setMobileNavOpen(prev => !prev)}>
              <Bars2 />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
            <Link href={'/'}>Inicio</Link>
            <Link href={'menu'}>Menú</Link>
            <Link href={'/about'}>Nosotros</Link>
            <Link href={'/contact'}>Contactos</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}
        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold mr-1">
            <Link className="text-primary font-semibold text-2xl" href={'/'}>
              PIZZA CARLO'S
            </Link>
            <Link href={'/'}>Inicio</Link>
            <Link href={'menu'}>Menú</Link>
            <Link href={'/about'}>Nosotros</Link>
            <Link href={'/contact'}>Contactos</Link>
          </nav>
          <nav className="flex items-center gap-8 text-gray-500 font-semibold ml-1">
            <AuthLinks status={status} userName={userName} />
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    );
}