

const OrderDetails = ({ order, handleDelete }) => {

    return (
        <td className="grid grid-cols-12 pb-4">
            <dl className="col-start-2 col-span-11 flex flex-col gap-1 p-4 rounded-lg">
                {
                    order.details.table.length > 0 ?
                        <div className="flex gap-3 text-sm">
                            <dt className="font-semibold">Tisch:</dt>
                            <dd>{order.details.table}</dd>
                        </div> : null
                }
                <div className="text-sm">
                    <dt className="font-semibold">Zahlungsmethode</dt>
                    <dd>{order.details.payment_method.name}</dd>
                </div>
                <div className="text-sm">
                    <dt className="font-semibold">Kundendaten:</dt>
                    {order.details.customer_data.name.length > 0 ? <dd>{order.details.customer_data.name} {order.details.customer_data.surname}</dd> : null}
                    {order.details.customer_data.email.length > 0 ? <dd>{order.details.customer_data.email}</dd> : null}
                    {order.details.customer_data.phone.length > 0 ? <dd>{order.details.customer_data.phone}</dd> : null}
                    {
                        order.details.customer_data.address.length > 0 || order.details.customer_data.city.length > 0 ?
                            <dd>{order.details.customer_data.address} {order.details.customer_data.city} {order.details.customer_data.postcode}</dd> : null
                    }
                </div>
                <div className="text-sm">
                    <dt className="font-semibold">Zahlungsmethode</dt>
                    <dd>{order.details.payment_method.name}</dd>
                </div>
                <div className="flex justify-end">
                    <button onClick={handleDelete} className="secondary-button px-4 py-2 flex items-center gap-2">
                        <span>Löschen</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </dl>
        </td>
    )
}

export default OrderDetails