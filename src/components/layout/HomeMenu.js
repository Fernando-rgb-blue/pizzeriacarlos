'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3));
            });
        });
    }, []);
    return (
        <section className="">
            <div className="absolute left-0 right-0">
                <div className="absolute left-0 -top-[70px] -z-10">
                    <Image src={'/pizza1.png'} width={200}
                    height={262} alt={'pizza'} />
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/pizza2.png'} width={200}
                    height={262} alt={'pizza'} />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders
                    subHeader={'Echa un vistazo a'}
                    mainHeader={'Los mejores del día'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem {...item} />
                )) }
            </div>
        </section>
    );
}