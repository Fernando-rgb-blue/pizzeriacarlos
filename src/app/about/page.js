'use client';
import React, { useState, useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import ServicesPage from "../servicesSection/page";

export default function AboutPage() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Obtener el ancho de la ventana inicialmente

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
        <section className="text-center mt-8 mb-7" id="about">
            <SectionHeaders subHeader={"Nuestra Historia"} mainHeader={"Sobre nosotros"} />
        </section>

        <div className="section-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {windowWidth > 768 && (
                <div className="w-full md:w-1/2">
                <img src={"/banner2.png"} alt="" />
                </div>
            )}
            <div className="w-full md:w-1/2">
                <div className="text-left md:w-4/5">
                <blockquote className="my-5 text-secondary leading-[30px] text-gray-500">
                    Pizza CARLO's es fruto de una aventura de emprendimiento familiar que empezó en el año 2015; una aventura llena de esfuerzos y sacrificios, cuyo objetivo era ofrecer un negocio de pizzería basado en un modelo de conexión con sus clientes, buscando no solo su satisfacción, sino también, momentos memorables de compartir en familia. <br />
                    <br /> Para ello, sus productos debían contar con insumos de primera calidad para lograr su característica principal “Una pizza suave y crocante”, la cual se cuida mantener hasta hoy.
                </blockquote>
                </div>
            </div>
            </div>
        </div>

        {/* gap-12         justify-center    */}
        <div className="section-container justify-center mt-10">
            <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 m-10" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)" }}>
                <img className="w-full" src={"/Misión1.png"} alt="" />
                <blockquote className="my-5 text-secondary text-gray-500 leading-[30px] text-center mx-3">
                Ofrecer en cada momento UNA VIVENCIA CARLO's llena de Felicidad y Satisfacción hacia nuestros clientes, colaboradores y la sociedad, a través de nuestra marca, productos y servicios de calidad.
                </blockquote>
            </div>

            <div className="md:w-1/2 m-10" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)" }}>
                <img className="w-full" src={"/Vision1.png"} alt="" />
                <blockquote className="my-5 text-secondary leading-[30px] text-gray-500 text-center mx-3">
                Ser marca líder en el rubro de las pizzas a nivel nacional, teniendo siempre como base fundamental a nuestros clientes, colaboradores y socios de negocios.
                </blockquote>
            </div>
            </div>
        </div>


        





        <ServicesPage />
    </>
  );
}
