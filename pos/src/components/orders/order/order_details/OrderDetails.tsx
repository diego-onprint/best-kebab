
const OrderDetails = ({ order }) => {

    return (
        <td className="grid grid-cols-12 pb-4">
            <dl className="col-start-2 col-span-11 flex flex-col gap-1 bg-zinc-50 p-4 rounded-lg">
                <div className="text-sm">
                    <dt className="font-semibold">Zahlungsmethode</dt>
                    <dd>{order.details.payment_method.name}</dd>
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
                </div>
                <div className="bg-white p-5 rounded-md mt-2">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="border border-zinc-300 p-1 text-left">Q</th>
                                <th className="border border-zinc-300 p-1 text-left">Artikel</th>
                                <th className="border border-zinc-300 p-1 text-left">CHF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.cart.products.map(product => {
                                    return (
                                        <>
                                            <tr key={product.uid}>
                                                <td className="border border-zinc-300 p-1">{product.qty}</td>
                                                <td className="border border-zinc-300 p-1 flex-1" style={{ "flex": 1 }}>
                                                    {product.name}
                                                </td>
                                                <td className="border border-zinc-300 p-1 w-[55px]" style={{ "width": "55px" }}>
                                                    {(product.total).toFixed(2)}
                                                </td>
                                            </tr>
                                            {
                                                product.variations.length > 0 ?
                                                    product.variations.map((variation) => {
                                                        return (
                                                            <tr key={variation.option_id}>
                                                                <td className="border border-zinc-300 p-1 text-xs"></td>
                                                                <td className="border border-zinc-300 p-1 text-xs">{variation.option_name}</td>
                                                                <td className="border border-zinc-300 p-1 text-xs">{variation.option_price}</td>
                                                            </tr>
                                                        )
                                                    }) : null
                                            }
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </dl>
        </td>
    )
}

export default OrderDetails