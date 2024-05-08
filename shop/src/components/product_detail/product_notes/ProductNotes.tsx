import { forwardRef } from 'react'

const ProductNotes = forwardRef((props, ref) => {
    return (
        <div className="flex flex-col gap-1 bg-white rounded-md p-4">
            <h4 className="font-medium">Bemerkung</h4>
            <textarea rows={1} className="w-full p-2 border border-zinc-200 resize-none rounded-md" ref={ref} />
        </div>
    )
})

export default ProductNotes