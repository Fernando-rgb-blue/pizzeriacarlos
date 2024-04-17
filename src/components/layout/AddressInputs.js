export default function AddressInputs({addressProps, setAddressProp, disabled=false}) {
    const {phone, streetAddress, city} = addressProps;
    return (
        <>
            <label>
                Teléfono
            </label>
            <div>
                <input
                    disabled={disabled}
                    type="tel" 
                    placeholder="Telefono"
                    value={phone || ''}
                    onChange={ev => {
                        const input = ev.target.value;
                        const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
                        if (input.length <= 9 && regex.test(input)) {
                            setAddressProp('phone', input);
                            if (input.length !== 9) {
                                document.getElementById('error-message').innerText = "El teléfono debe tener 9 dígitos";
                            } else {
                                document.getElementById('error-message').innerText = '';
                            }
                        } else {
                            // Muestra un mensaje de error debajo del campo de entrada
                            if (input.length > 9) {
                                document.getElementById('error-message').innerText = "El teléfono debe tener 9 dígitos";
                            } else {
                                document.getElementById('error-message').innerText = "¡Solo se permiten números!";
                            }
                            setTimeout(() => {
                                document.getElementById('error-message').innerText = ''; // Borra el mensaje 
                            }, 3000); //(3 segundos)
                        }
                    }}
                />
                <div id="error-message" style={{ color: 'red' }}></div>
            </div>
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
                type="text" placeholder= "Referencia"
                value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
            />
        </>
    );
}