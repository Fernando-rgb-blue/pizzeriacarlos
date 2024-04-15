'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import useProfile from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Falló el pago 😢');
            }
        }
    }, []);

    useEffect(() => {
        if (profileData?.city) {
            const {phone, streetAddress, city} = profileData;
            const addressFromProfile = {phone, streetAddress, city};
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    const deliveryPrice = 5;
    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]:value}));
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    address,
                    cartProducts
                })
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparando orden...',
            success: 'Redirigiendo...',
            error: 'Algo salió mal. Intente más tarde.'
        })
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Carrito" />
                <p className="mt-4">
                    Tu carrito de compras está vacío 😢
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Carrito" />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>
                            No hay productos en tu carrito.
                        </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            product={product}
                            index={index}
                            onRemove={removeCartProduct}
                        />
                    ))}
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            S/{subtotal}<br />
                            S/{deliveryPrice}<br />
                            S/{subtotal + deliveryPrice}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg max-h-80">
                    <h2>
                        Pago
                    </h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit">
                            Pagar S/{subtotal + deliveryPrice}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}