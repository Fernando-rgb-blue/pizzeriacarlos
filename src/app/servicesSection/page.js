'use client';
// import SectionHeaders from "@/components/layout/SectionHeaders";
import React from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";


const serviceLists = [
    {id:1, title: "Catering", des: "Deleita a tus invitados con nuestros sabores y presentación.", img: "catering.png"},
    {id:2, title: "Entrega rápida", des: "Entregamos su pedido puntualmente en su puerta.", img: "delivery.png"},
    {id:3, title: "Pedidos en línea", des: "Explore el menú y ordene con facilidad usando nuestro pedido en línea.", img: "online.png"},
    {id:4, title: "Somos honestos", des: "Siempre hacemos lo correcto, actuamos con ética.", img: "honestos.png"},
    {id:5, title: "Somos responsables", des: "Cumplimos nuestras funciones con calidad y profesionalismo.", img: "responsables.png"},
    {id:6, title: "Hospitalidad", des: "Siempre dando un trato cordial y atención personalizada.", img: "hospitalidad.png"},

]

export default function ServicesPage() {

    return (
    <>

        <div className="section-container my-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                <div className="text-left md:w-4/5">
                    <p className="subtitle">¿QUÉ ESPERAr de nosotros?</p>
                    <h2 className="title">Nuestros servicios y valores</h2>
                    <p className="my-5 text-secondary leading-[30px]">
                        Arraigados en la pasión por la pizza, 
                        creamos experiencias gastronómicas memorables y brindamos un servicio 
                        excepcional, combinando la maestría culinaria con una hospitalidad acogedora.
                    </p>

                    <a href={'/register'} style={{ width: 'fit-content'}} className="bg-primary font-semibold text-white px-8 py-3 rounded-full ">
                        ¡Regístrate Ahora!
                    </a>

                </div>
                </div>
                <div className="md:w-1/2 ">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-stretch">
                        {
                            serviceLists.map((service) => (
                                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                                    <img src={service.img} alt="" className=" mx-auto"/>
                                    <h5 className="pt-3 font-semibold"> {service.title}</h5>
                                    <p className="text-gray-500">{service.des}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    </>
    );
}