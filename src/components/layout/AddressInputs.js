export default function AddressInputs({addressProps, setAddressProp, disabled=false}) {
    const {phone, streetAddress, city} = addressProps;
    return (
        <>
        
            <label>
                Teléfono
            </label>
            <input
                disabled={disabled}
                type="tel" placeholder= "Telefono"
                value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)}
            />
            <label>
                Dirección
            </label>
            <input
                disabled={disabled}
                type="text" placeholder= "Dirección"
                value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
            />
            <label>
                Referencia
            </label>
            <input
                disabled={disabled}
                type="text" placeholder= "Ciudad"
                value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
            />
        </>
    );
}