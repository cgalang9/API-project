import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getAllBookingsCurrUserThunk } from "../../store/bookings";
import './BookingsCurrentUser.css'

function BookingsCurrentUser() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBookingsCurrUserThunk())
    }, [dispatch])

    const bookingsObj = useSelector(state => state.bookings)
    const bookings = Object.values(bookingsObj)

    return (
        <div className="curr-user-bookings-container top flex">
            <h1>Your Trips</h1>
            <div className="curr_user_booking_list">
                {bookings && (
                    bookings.map(booking => (
                        <>
                        {booking.Spot && (
                            <div className="curr_user_booking_list_item_container" key={booking.id}>
                                <img
                                    src={booking.Spot.previewImage || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'}
                                    alt="spot"
                                    onError={e => {
                                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                        e.onerror = null
                                      }}
                                    className='curr_user_booking_list_item__img'
                                />
                                <div className="curr_user_booking_list_item_details">
                                    <div className="curr_user_booking_list_item_city">{booking.Spot.city}</div>
                                    <div className="curr_user_booking_list_item_dates">
                                        {new Date(booking.startDate.replace(/-/g, '\/')).toDateString().slice(4)} - {new Date(booking.endDate.replace(/-/g, '\/')).toDateString().slice(4)}
                                    </div>
                                    <NavLink to={`/bookings/${booking.id}/edit`}>Edit/Delete Trip</NavLink>

                                </div>
                            </div>
                        )}
                        </>
                    ))
                )}
            </div>
        </div>
    )
}

export default BookingsCurrentUser
