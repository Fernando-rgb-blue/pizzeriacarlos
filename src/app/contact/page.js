'use client';
// import SectionHeaders from "@/components/layout/SectionHeaders";
import React from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import ServicesPage from "../servicesSection/page";

const contacList = [
    {id:1, title: "Teléfono", des: "998574125", img: "telefono.png", hreff:""},
    {id:2, title: "Atención", des: "4:00 pm - 10:00 pm", img: "horario.png", hreff:""},
    {id:3, title: "Correo", des: "carlosPizzeria@gmail.com", img: "correo.png", hreff:"mailto:carlosPizzeria@gmail.com"},
    

]

export default function ContactPage() {

  return (
    <>
        {/* contactanos */}
        <section className="text-center mt-8 mb-7" id="contact">
            <SectionHeaders
            subHeader={'Danos tu opinión'}
            mainHeader={'Contáctanos'}
            />
        
        </section>                    
            
            
            
        <div className="w-full ">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 items-stretch">
                {
                    contacList.map((service) => (
                        // <a href={service.hreff}>
                            <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="text-2xl pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-gray-500">{service.des}</p>
                        </div>
                        // </a>

                        
                    ))
                }
            </div>
        </div>

        <div className="section-container" style={{ marginTop: "95px" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="w-full md:w-1/2">
                    <div className="text-left md:w-4/5">
                    <img src={'/ubicacion.png'}></img>
                        <p className="subtitle">Dirección</p>
                        <h2 className="title">Nos encontramos en:</h2>
                        <blockquote className="my-5 text-secondary leading-[30px] text-gray-500">
                            Dirección
                            Av. España 130 (cerrado Domingo)

                            Av. Húsares de Junín N° 1164
                        </blockquote>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img src={'/mapa.webp'} className="w-full md:w-auto" alt="Imagen del mapa" />
                </div>
            </div>
        </div>


        <ServicesPage />

    </>
  );
}