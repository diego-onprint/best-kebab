
const Form = ({ customerData, handleForm }) => {

    return (
        <form className="flex flex-col gap-2">
            <div className="flex gap-1">
                <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Vorname"
                />
                <input
                    type="text"
                    name="surname"
                    value={customerData.surname}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Nachname"
                />
            </div>
            <input
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleForm}
                className="input-field"
                placeholder="Strasse, Nr."
            />
            <div className="flex gap-1">
                <input
                    type="text"
                    name="city"
                    value={customerData.city}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="ORT"
                />
                <input
                    type="text"
                    name="postcode"
                    value={customerData.postcode}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="PLZ"
                />
            </div>
            <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleForm}
                className="input-field"
                placeholder="Telefon"
            />
            <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleForm}
                className="input-field"
                placeholder="Email"
            />
            <textarea
                rows={2}
                name="notes"
                placeholder="Bemerkung"
                className="flex-1 input-field resize-none rounded-md"
                onChange={handleForm}
            />
        </form>
    )
}

export default Form