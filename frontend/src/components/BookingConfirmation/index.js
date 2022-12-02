import { useEffect } from "react"
import { useLocation, NavLink, useHistory } from "react-router-dom"
import './BookingConfirmation.css'

function BookingConfirmation() {
    const location = useLocation()
    const history = useHistory()
    let startDate;
    let endDate;

    useEffect(() => {
        if (!location.state) {
            history.push('/')
        } else {
            startDate = new Date(location.state.newBooking.startDate.replace(/-/g, '\/')).toDateString()
            endDate = new Date(location.state.newBooking.endDate.replace(/-/g, '\/')).toDateString()
        }
    }, [])

    return (
        <div className="booking_confirmed_wrapper">
            <div className="booking_confirmed_container">
                <div className="booking_confirmed_left">
                    <h1>Confirm and pay</h1>
                </div>
                <div className="booking_confirmed_right">
                    <h1>test</h1>
                </div>
                {/* <h1 className="top">You Reservation Has Been Successfully Created</h1>
                <div className="booking_location_confirmed">Location: {location.state.name}</div>
                <div className="booking_dates_confirmed">Dates: {startDate} - {endDate}</div>
                <div className="booking_location_confirmed">{location.state.guests} {location.state.guests === 1 ? 'Guest' : 'Guests'} </div>
                <div className="booking_fees_confirmed">
                    <div className='base_fee_confirmed'>${location.state.price} x {location.state.bookingLength} night = ${location.state.price * location.state.bookingLength}</div>
                    <div className='cleaning_fee_confirmed'>Cleaning Fee = ${location.state.cleaningFee}</div>
                    <div className='service_fee_confirmed'>Service Fee = ${location.state.serviceFee}</div>
                    <div className="total_fee_confirmed">Total = ${(location.state.price * location.state.bookingLength) + location.state.cleaningFee + location.state.serviceFee}</div>
                </div>
                <div style={{ marginTop: 25 }}><NavLink exact to="/current-user/bookings">Go To Your Bookings</NavLink></div> */}
            </div>
        </div>
    )
}

export default BookingConfirmation
