import ButtonCreateTkwOrder from "../common/button_create_tkw_order/ButtonCreateTkwOrder"
import PrintButton from "../common/print_button/PrintButton"
import Spinner from "../common/spinner/Spinner"
import Form from "./form/Form"

const View = ({
    customerData,
    orderType,
    handleOrderType,
    handleForm,
    handleCancel,
    handleCreateTkwOrder,
}) => {

    //TODO Get DomRefs for print button!!!

    return (
        <div className="grid place-items-center fixed inset-0 bg-zinc-950/30">
            <div className="relative grid grid-cols-12 bg-white divide-x rounded-md py-6 px-2 w-11/12 max-w-screen-lg">
                <div className="col-span-3 flex flex-col gap-4 divide-y px-6">
                    <div className="flex flex-col gap-2 pt-4">
                        <button onClick={() => handleOrderType({ name: "Lieferung", value: "delivery" })} className={`button-base border border-zinc-200 ${orderType.value === "delivery" && "bg-zinc-200"}`}>Lieferung</button>
                        <button onClick={() => handleOrderType({ name: "Abholung", value: "takeaway" })} className={`button-base border border-zinc-200 ${orderType.value === "takeaway" && "bg-zinc-200"}`}>Abholung</button>
                        {/* <button onClick={() => handleOrderType({ name: "Tisch", value: "tisch" })} className={`button-base border border-zinc-200 ${orderType.value === "tisch" && "bg-zinc-200"}`}>Tisch</button> */}
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-2 px-6">
                    <h3 className="font-semibold">Kundendaten</h3>
                    <Form customerData={customerData} handleForm={handleForm} />
                </div>
                <div className="col-span-4 flex flex-col gap-2 divide-y px-6">
                    <button onClick={handleCancel} className="ghost-button col-span-3">Cancel</button>
                    {/* <PrintButton buttonStyle="ghost-button col-span-3">Print</PrintButton> */}
                    <button onClick={handleCreateTkwOrder} className="primary-button col-span-6">
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default View