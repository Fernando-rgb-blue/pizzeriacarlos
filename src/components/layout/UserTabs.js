'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}) {
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
            <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>
                Perfil
            </Link>
            {isAdmin && 
                <>
                    <Link href={'/categories'} className={path === '/categories' ? 'active' : ''}>
                        Categorías
                    </Link>
                    <Link href={'/menu-items'} className={path.includes('menu-items') ? 'active' : ''}>
                        Ítems del menú
                    </Link>
                    <Link href={'/users'} className={path.includes('users') ? 'active' : ''}>
                        Usuarios
                    </Link>
                    
                </>
            }
            <Link href={'/orders'} className={path === '/orders' ? 'active' : ''}>
                Órdenes
            </Link>
        </div>
    );
}