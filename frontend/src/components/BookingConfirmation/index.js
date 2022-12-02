import { useEffect } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import './BookingConfirmation.css'

function BookingConfirmation() {
    const location = useLocation()
    const history = useHistory()

    //redirect to home page if no booking details passed in
    useEffect(() => {
        if (!location.state) {
            history.push('/')
        }
    }, [])


    return (
        <>
            {location.state && (
                <div className="booking_confirmed_wrapper">
                    <div className="booking_confirmed_container">
                        <div className="booking_confirmed_left">
                            <h1>Confirm and pay</h1>
                            <div className="booking_confirmed_left_details">
                                <div className="booking_confirmed_left_details_head">Your Trip</div>
                                <div className="booking_confirmed_left_dates_container">
                                    <div className="booking_confirmed_left_dates_head">Dates</div>
                                    <div className="booking_confirmed_left_dates">
                                        {/* format start and end dates */}
                                        <span>{new Date(location.state.newBooking.startDate.replace(/-/g, '\/')).toLocaleString('default', { month: 'short', day: 'numeric' })}</span>
                                        <span>-</span>
                                        <span>{new Date(location.state.newBooking.endDate.replace(/-/g, '\/')).toLocaleString('default', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                                <div className="booking_confirmed_left_guests_container">
                                    <div className="booking_confirmed_left_guests_head">Guests</div>
                                    <div className="booking_confirmed_left_guests">{location.state.guests} {location.state.guests === 1 ? 'Guest' : 'Guests'}</div>
                                </div>
                            </div>
                            <div className="booking_confirmed_cancel_policy">
                                <div className="booking_confirmed_left_policy_head">Cancellation policy</div>
                                <div className="booking_confirmed_left_policy_text">This reservation is non-refundable. Learn more</div>
                            </div>
                        </div>
                        <div className="booking_confirmed_right">
                            <div className="booking_confirmed_right_tile_container">
                                <div className="booking_confirmed_right_tile_spot_container">
                                    <div className="booking_confirmed_right_tile_spot_img">
                                        <img
                                            src={location.state.prevImgUrl}
                                            alt="spot"
                                            className='booking_confirmed_spot_img'
                                            onError={e => {
                                                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                                e.onerror = null
                                            }}
                                        />
                                    </div>
                                    <div className="booking_confirmed_right_tile_spot_details">
                                        <div className="booking_confirmed_right_tile_spot_details_top">{location.state.name}</div>
                                        <div className="booking_confirmed_right_tile_spot_details_bottom">
                                            <span style={{ fontSize: 12 }}><i className="fa-sharp fa-solid fa-star"/></span>
                                            <span>{(location.state.avgStarRating && location.state.avgStarRating.toFixed(2)) || (location.state.numReviews > 0 && "0.00") || "New"}</span>
                                            <span style={{ color: 'gray' }}>({location.state.numReviews === 1 ? '1 review' : `${location.state.numReviews} reviews`})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="booking_confirmed_right_tile_details_container">
                                    <div className="booking_confirmed_right_tile_details_head">Price Details</div>
                                    <div className='booking_confirmed_right_tile_base_fee'>
                                        <div>${location.state.price} x {location.state.bookingLength} night</div>
                                        <div>${location.state.price * location.state.bookingLength}</div>
                                    </div>
                                    <div className='booking_confirmed_right_tile_cleaning_fee'>
                                        <div>Cleaning Fee</div>
                                        <div>${location.state.cleaningFee}</div>
                                    </div>
                                    <div className='booking_confirmed_right_tile_service_fee'>
                                        <div>Service Fee</div>
                                        <div>${location.state.serviceFee}</div>
                                    </div>
                                </div>
                                    <div className="booking_confirmed_right_total_fee">
                                        <div>Total</div>
                                        <div>${(location.state.price * location.state.bookingLength) + location.state.cleaningFee + location.state.serviceFee}</div>
                                    </div>
                            </div>
                        </div>
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

            )}
        </>
    )
}

export default BookingConfirmation
