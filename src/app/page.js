import Hero from "@/components/layout/Hero"
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Historia'}
          mainHeader={'Sobre nosotros'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4
        flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Proin fermentum lectus sed scelerisque imperdiet.
            Duis elementum tempor sapien eget feugiat.
            Nam eu lectus a ligula sagittis vulputate.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Fusce quis nisi eget sem porttitor scelerisque in nec lacus.
            Duis elementum tempor sapien eget feugiat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            Proin gravida magna elit, sed blandit libero condimentum id.
            Donec ultricies, mauris at sodales sodales,
            turpis urna egestas arcu, ut gravida lacus velit sed nisi.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'¡No lo dudes!'}
          mainHeader={'Contáctanos'} />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+51912071126">
            +51 912 071 126
          </a>
        </div>
      </section>
    </>
  );
}
