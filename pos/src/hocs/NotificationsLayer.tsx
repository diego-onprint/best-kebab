import { RootState } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { setNotification } from '../store/notification/notificationSlice'

const NotificationsLayer = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>()
    const notification = useSelector<RootState, {show: boolean, data: object}>(state => state.notification)

    const handleClick = () => {
        dispatch(setNotification({ show: false, data: {} }))
    }

    return (
        <div>
            {
                notification.show ?
                    <div onClick={handleClick} className="fixed bg-white z-[999] top-4 left-1/2 -translate-x-1/2 p-2 rounded-md shadow-md">
                        New order for {notification.data.from}
                    </div> : null
            }
            {children}
        </div>
    )
}

export default NotificationsLayer