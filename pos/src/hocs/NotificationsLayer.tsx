import { RootState } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { setNotification } from '../store/notification/notificationSlice'

// TODO notification stack

const NotificationsLayer = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()
    const notification = useSelector<RootState, { show: boolean, data: object }>(state => state.notification)

    const handleClick = () => {
        dispatch(setNotification({ show: false, data: {} }))
    }

    return (
        <div>
            {
                notification.show ?
                    <div onClick={handleClick} className="fixed bg-white z-[999] top-4 right-6 font-semibold rounded-md shadow-md overflow-hidden">
                        <div className="relative p-6">
                            <span className="bg-green-500 absolute top-0 left-0 h-full w-2"></span>
                            <p>Neue Bestellung ({notification.data.order.data.slug})</p>
                        </div>
                    </div> : null
            }
            {children}
        </div>
    )
}

export default NotificationsLayer