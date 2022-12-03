import { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { createBookingThunk } from "../../store/bookings"
import './BookingConfirmation.css'
import error_img from '../../assests/error_img.jpeg'

function BookingConfirmation() {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()

    //redirect to home page if no booking details passed in
    useEffect(() => {
        if (!location.state) {
            history.push('/')
        }
    }, [])

    const [checkin, setCheckin] = useState(location.state.newBooking.startDate)
    const [checkout, setCheckout] = useState(location.state.newBooking.endDate)
    const [bookingLength, setBookingLength] = useState(location.state.bookingLength)
    const [errors, setErrors] = useState([])

    //updates booking length
    useEffect(() => {
        if(checkin && checkout) {
            if(checkin < checkout) {
                const checkinDate = new Date(checkin)
                const checkoutDate = new Date(checkout)
                const diff = checkoutDate.getTime() - checkinDate.getTime();
                const days = Math.ceil(diff / (1000 * 3600 * 24));
                setBookingLength(days)
            } else {
                setBookingLength(1)
            }
        }
    }, [checkin, checkout])


    const handlePay = async() => {
        setErrors([]);
        const newBooking = {
            startDate: checkin,
            endDate: checkout
        }


        dispatch(createBookingThunk(newBooking, spotId))
            .then(() => history.push('/current-user/bookings'))
            .catch(async (res) => {
                const data = await res.json();
                if(data.statusCode === 404) {
                  history.push('/404')
                }
                if (data && data.errors) {
                      setErrors(Object.values(data.errors))
                      console.log(errors)
                  } else if (data.message) {
                      setErrors([data.message])
                  }
            })

    }

    const toggleEditDates = () => {
        const edit_dates_div = document.querySelector('.booking_confirmed_edit_dates')
        if(edit_dates_div.classList.contains('hidden')) {
            edit_dates_div.classList.remove('hidden')
          } else {
            edit_dates_div.classList.add('hidden')
          }
    }


    return (
        <>
            {location.state && (
                <div className="booking_confirmed_wrapper">
                    <div className="booking_confirmed_container">
                        <div className="booking_confirmed_left">
                            <div className="booking_confirmed_left_head">
                                <div className="booking_confirmed_back" onClick={() => history.push(`/spots/${spotId}`)}><i className='fa-solid fa-angle-left' /></div>
                                <div><h1>Confirm and pay</h1></div>
                            </div>
                            <div className="booking_confirmed_left_details">
                                <div className="booking_confirmed_left_details_head">Your Trip</div>
                                <div className="booking_confirmed_left_dates_container">
                                    <div className="booking_confirmed_left_dates_head">Dates</div>
                                    <div className="booking_confirmed_left_dates_bottom">
                                        <div className="booking_confirmed_left_dates">
                                            {/* format start and end dates */}
                                            <span>{new Date(checkin.replace(/-/g, '\/')).toLocaleString('default', { month: 'short', day: 'numeric' })}</span>
                                            <span>-</span>
                                            <span>{new Date(checkout.replace(/-/g, '\/')).toLocaleString('default', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div onClick={toggleEditDates} id='booking_confirmed_edit_dates_btn'>Edit</div>
                                    </div>
                                    <div className="booking_confirmed_edit_dates hidden">
                                        <div className='booking_confirmed_edit_checkin'>
                                            <label className='flex'>
                                                <span className='input_label' id="edit_checkin_label">CHECK IN</span>
                                                <input
                                                type="date"
                                                value={checkin}
                                                onChange={(e) => setCheckin(e.target.value)}
                                                required
                                                id="booking_confirmed_edit_checkin"
                                                />
                                            </label>
                                        </div>
                                        <div className='booking_confirmed_edit_checkout'>
                                            <label className='flex'>
                                                <span className='input_label' id="edit_checkout_label">CHECK OUT</span>
                                                <input
                                                type="date"
                                                value={checkout}
                                                onChange={(e) => setCheckout(e.target.value)}
                                                required
                                                id="booking_confirmed_edit_checkout"
                                                />
                                            </label>
                                        </div>
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
                            <div className='confirm_pay_btn_container'>
                                <div className="errors" style={{ marginBottom: 12 }}>
                                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </div>
                                <button className='confirm_pay_btn' onClick={handlePay}>Confirm and pay</button>
                            </div>
                        </div>
                        <div className="booking_confirmed_right">
                            <div className="booking_confirmed_right_tile_container">
                                <div className="booking_confirmed_right_tile_spot_container">
                                    <div className="booking_confirmed_right_tile_spot_img">
                                        <img
                                            src={location.state.prevImgUrl || error_img}
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
                                        <div>${location.state.price} x {bookingLength} night</div>
                                        <div>${location.state.price * bookingLength}</div>
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
                                        <div>${(location.state.price * bookingLength) + location.state.cleaningFee + location.state.serviceFee}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default BookingConfirmation
