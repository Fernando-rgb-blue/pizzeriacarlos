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
        <Link href={'/profile'} className="whitespace-nowrap m-2">
          Hola, {userName}
        </Link>
        <button
          onClick = {() => {signOut({callbackUrl: '/', redirect: true})}}
          className=" w-auto bg-primary rounded-full text-white px-8 py-2">
          Cerrar&nbsp;sesión
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'} className="m-2">Ingresar</Link>
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
      {/* vista de cel */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '100', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: mobileNavOpen ? 'block' : 'none' }} onClick={() => setMobileNavOpen(false)}></div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: '101', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}} className="flex items-center md:hidden justify-between bg-white p-3">
          <Link style={{ width: '70%' }} className="text-primary font-bold text-2xl" href={'/'}>
              ST PIZZA
          </Link>
          
          <div className="flex gap-8 items-center">
              <Link href={'/cart'} className="relative">
                  <ShoppingCart />
                  {cartProducts?.length > 0 && (
                      <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                          {cartProducts.length}
                      </span>
                  )}
              </Link>
              <button
                  className="p-1 border"
                  onClick={() => setMobileNavOpen(prev => !prev)}>
                  <Bars2 />
              </button>
          </div>
      </div>
      {mobileNavOpen && (
          <div
            style={{ zIndex: '103' }} className="md:hidden p-4 bg-gray-200 rounded-lg mt-14 fixed top-0 left-0 w-full flex flex-col gap-2 text-center">
              <div onClick={() => setMobileNavOpen(false)} className="flex flex-col items-center">
                  <Link href={'/'} className="m-2">Inicio</Link>
                  <Link href={'/menu'}  className="m-2">Menu</Link>
                  <Link href={'/about'}  className="m-2">Nosotros</Link>
                  <Link href={'/contact'} className="m-2">Contáctanos</Link>
                  <AuthLinks status={status} userName={userName} />
              </div>
          </div>
      )}


      {/* vista de compu */}
      <div style={{ position: 'fixed', width: '100%', zIndex: '100', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}} className="hidden md:flex items-center justify-between bg-white p-3">
        
        <div style={{ width: '5%' }} ></div>
        <nav style={{ width: '65%' }}  className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-bold text-2xl" href={'/'}>
            Pz CARLO'S
          </Link>
          <Link href={'/'}>Inicio</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/about'}>Nosotros</Link>
          <Link href={'/contact'}>Contáctanos</Link>
        </nav>
        
        <nav style={{ width: '25%', justifyContent: 'right'}} className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative" >
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav>
        <div style={{ width: '5%' }} ></div>
      </div>

      
    </header>

    );
}