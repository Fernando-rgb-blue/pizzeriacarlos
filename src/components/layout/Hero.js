import Image from "next/image"
import Right from "@/components/icons/Right"

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-10 md:py-20">
                <h1 className="text-4xl font-semibold">
                    Todo es<br />
                    mucho mejor<br />
                    con una&nbsp;
                    <span className="text-primary">
                        Pizza
                    </span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    La pizza es la pieza faltante que nos llena cada día,
                    un simple pero delicioso lujo para gozar.
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
                        Pídenos ya
                        <Right />
                    </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
                        Aprenda más
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} layout={'fill'}
                objectFit={'contain'} alt={'pizza'} />
            </div>
        </section>
    );
}