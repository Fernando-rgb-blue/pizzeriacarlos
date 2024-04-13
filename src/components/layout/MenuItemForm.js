'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);
    
    return (
        <form
            onSubmit={ev =>
                onSubmit(ev, {
                    image, name, description, basePrice, sizes, extraIngredientPrices, category
                })
            }
            className="mt-8 max-w-lg mx-auto">
            <div className="grid items-start gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div>
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className="grow">
                    <label>Nombre en el menú</label>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <label>Categoría</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Precio inicial</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                    />
                    <MenuItemPriceProps
                        name={'Tamaños'}
                        addLabel={'Añadir tamaños'}
                        props={sizes}
                        setProps={setSizes}
                    />
                    <MenuItemPriceProps
                        name={'Ingredientes extras'}
                        addLabel={'Añadir precios extras'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <button type="submit">Guardar</button>
                </div>
            </div>
        </form>
    );
}