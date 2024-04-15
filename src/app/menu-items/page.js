'use client';
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });
    }, []);

    if (loading) {
        return 'Cargando datos de usuario...';
    }

    if (!data.admin) {
        return 'No posees roles de administrador.';
    }

    return (
        <section className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>Crear un nuevo ítem</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">
                    Editar ítem:
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link
                            key={item._id}
                            href={'/menu-items/edit/' + item._id}
                            className="bg-gray-200 rounded-lg p-4"
                        >
                            <div className="relative">
                                <Image className="rounded-md"
                                    src={item.image} alt={''} width={200} height={200} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
