export default function AddressInputs({addressProps, setAddressProp}) {
    const {phone, streetAddress, city} = addressProps;
    return (
        <>
            <label>
                Teléfono
            </label>
            <input
                type="tel" placeholder= "Telefono"
                value={phone} onChange={ev => setAddressProp('phone', ev.target.value)}
            />
            <label>
                Dirección
            </label>
            <input
                type="text" placeholder= "Dirección"
                value={streetAddress} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
            />
            <label>
                Ciudad
            </label>
            <input
                type="text" placeholder= "Ciudad"
                value={city} onChange={ev => setAddressProp('city', ev.target.value)}
            />
        </>
    );
}