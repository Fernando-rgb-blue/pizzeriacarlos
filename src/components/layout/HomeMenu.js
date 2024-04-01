import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
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
                    subHeader={'Carrito'}
                    mainHeader={'Menú'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}