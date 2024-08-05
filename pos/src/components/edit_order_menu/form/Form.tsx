/*
    TODO unify this form with the form in the cart?
    TODO handle errors
    TODO handle notifications (data updated)
*/
const Form = ({ orderData, setOrderData }) => {

    const handleForm = (e) => {
        setOrderData({
            ...orderData,
            customer_data: {
                ...orderData.customer_data,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <form className="flex flex-col gap-2">
            <h3 className="font-semibold">Kundendetails</h3>
            <div className="flex gap-1">
                <input
                    type="text"
                    name="name"
                    value={orderData.customer_data.name}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Vorname"
                />
                <input
                    type="text"
                    name="surname"
                    value={orderData.customer_data.surname}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="Nachname"
                />
            </div>
            <input
                type="text"
                name="address"
                value={orderData.customer_data.address}
                onChange={handleForm}
                className="input-field"
                placeholder="Strasse, Nr."
            />
            <div className="flex gap-1">
                <input
                    type="text"
                    name="city"
                    value={orderData.customer_data.city}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="ORT"
                />
                <input
                    type="text"
                    name="postcode"
                    value={orderData.customer_data.postcode}
                    onChange={handleForm}
                    className="input-field"
                    placeholder="PLZ"
                />
            </div>
            <input
                type="text"
                name="phone"
                value={orderData.customer_data.phone}
                onChange={handleForm}
                className="input-field"
                placeholder="Telefon"
            />
            <input
                type="email"
                name="email"
                value={orderData.customer_data.email}
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