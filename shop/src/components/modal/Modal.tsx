import React from 'react'

type PropsTypes = {
    children: React.ReactNode
    action: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Modal = ({ children, action }: PropsTypes) => {
    return (
        <div onClick={action} className="fixed inset-0 bg-zinc-800/50 grid place-items-center">
            {children}
        </div>
    )
}

export default Modal