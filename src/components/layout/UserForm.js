import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage"
import useProfile from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [city, setCity] = useState(user?.city || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'city') setCity(value);
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg mx-auto md:relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>
            <form
                className="grow"
                onSubmit={ev =>
                    onSave(ev, {name:userName, image, streetAddress, phone, city, admin})
                }>
                <label>
                    Nombres y apellidos
                </label>
                <input
                    type="text" placeholder="Nombre y apellidos" 
                    value={userName} onChange={ev => setUserName(ev.target.value)}
                />
                <label>
                    Correo
                </label>
                <input
                    type="email" disabled={true}
                    value={user?.email}
                    placeholder={'email'}
                />
                <AddressInputs
                    addressProps={{phone, streetAddress, city}}
                    setAddressProp={handleAddressChange}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label
                            className="p-2 inline-flex items-center gap-2 mb-2"
                            htmlFor="adminCb">
                            <input
                                id="adminCb" type="checkbox" className="" value={'1'}
                                checked={admin}
                                onChange={ev => setAdmin(ev.target.checked)}
                            />
                            <span>
                                Admin
                            </span>
                        </label>
                    </div>
                )}
                <button type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
}