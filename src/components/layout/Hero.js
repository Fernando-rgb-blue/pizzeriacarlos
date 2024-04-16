// Todo es
// mucho mejor
// con una Pizza
import Image from "next/image"
import Right from "@/components/icons/Right"

export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-20">
                <h1 className="text-4xl md:text-6xl font-semibold">
                    Todo es<br />
                    mucho mejor<br />
                    con una&nbsp;
                    <span className="text-primary">
                        Pizza
                    </span>
                </h1>
                <p className="my-6 text-gray-500 text-1xl">
                    La pizza es la pieza faltante que nos llena cada día,
                    un simple pero delicioso lujo para gozar.
                </p>
                <div className="flex gap-4 text-sm">
                    
                    <a href="/menu" className="flex w-full justify-center font-semibold bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
                        Pídenos ya
                        <Right />
                    </a>
                    <a href="/about" className="button flex items-center border-2 gap-2 py-2 text-gray-600 font-semibold bg-white">
                        Saber más
                        <Right />
                    </a>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/pizza.png'} layout={'fill'}
                objectFit={'contain'} alt={'pizza'} />
            </div>
        </section>
    );
}