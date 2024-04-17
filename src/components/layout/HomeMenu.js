// ECHA UN VISTAZO A
// Los mejores del día
'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import ServicesPage from "../../app/servicesSection/page";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const selectedMenuItems = [menuItems[1], menuItems[5], menuItems[7]];
                setBestSellers(selectedMenuItems);
            });
        });
    }, []);
    return (
        <>
            <section className="">
                <div className="absolute left-0 right-0">
                    <div className="absolute left-0 -top-[90px] -z-10">
                        <Image src={'/pizza1.png'} width={107}
                        height={262} alt={'pizza'} />
                    </div>
                    <div className="absolute -top-[100px] right-0 -z-10">
                        <Image src={'/pizza2.png'} width={107}
                        height={262} alt={'pizza'} />
                    </div>
                </div>
                <div className="text-center mb-4 mt-5 md:mt-10">
                    <SectionHeaders
                        subHeader={'Echa un vistazo a'}
                        mainHeader={'Los mejores del día'} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    {bestSellers?.length > 0 && bestSellers.map(item => (
                        <MenuItem key={item._id} {...item} />
                    )) }
                </div>
            </section>
        
        
            {/* lo de las tajadas */}
            <div className="text-center mb-4" style={{ marginTop: "95px" }}>
                    <SectionHeaders
                        subHeader={'Cantidades y'}
                        mainHeader={'Tamaños de pizzas'} />
                </div>
            <div className="section-container justify-center mt-10">
                <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-1/2" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)" }}>
                    <img className="w-full" src={"/personal.png"} alt="" />
                </div>

                <div className="md:w-1/2" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)" }}>
                    <img className="w-full" src={"/mediana.png"} alt="" />
                </div>
                </div>
            </div>         

            <ServicesPage />
        </>
        
        
    );
}