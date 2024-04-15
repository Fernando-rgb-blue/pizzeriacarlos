'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const {clearCart} = useContext(CartContext);
    const {id} = useParams();
    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                });
            });
        }
    }, []);

    const deliveryPrice = 5;
    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Tu orden" />
                <div className="mt-4 mb-8">
                    <p>
                        Gracias por tu orden.
                    </p>
                    <p>
                        Te informaremos cuando la orden esté en camino.
                    </p>
                </div>
            </div>
            {loadingOrder && (
                <div>
                    Cargando orden...
                </div>
            )}
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal: <span className="text-black font-bold inline-block w-10">S/{subtotal}</span><br />
                            Delivery: <span className="text-black font-bold inline-block w-10">S/{deliveryPrice}</span><br />
                            Total: <span className="text-black font-bold inline-block w-10">S/{subtotal + deliveryPrice}</span>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <AddressInputs disabled={true} addressProps={order} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}