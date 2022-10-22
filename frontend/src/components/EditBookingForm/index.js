import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getAllBookingsCurrUserThunk } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import './EditBookingForm.css'


function EditBooking() {
    const { bookingId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    // const [guests, setGuests] = useState(1)
    const [errors, setErrors] = useState([])
    const [bookingLength, setBookingLength] = useState(1)

    useEffect(() => {
        dispatch(getAllBookingsCurrUserThunk())
    }, [dispatch])

    const bookingsObj = useSelector(state => state.bookings)
    const bookings = bookingsObj.Bookings
    let booking;
    if(bookings) booking = bookings.find(booking => booking.id.toString() === bookingId)


    useEffect(() => {
        if(booking) {
            setCheckin(booking.startDate.toString())
            setCheckout(booking.endDate.toString())
        }
    }, [booking])

    let checkinFormatted;
    if (checkin) {
        checkinFormatted = new Date(checkin).toISOString().split('T')[0]
    }

    let checkoutFormatted
    if (checkout) {
        checkoutFormatted = new Date(checkout).toISOString().split('T')[0]
    }

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

   const handleSubmit = (e) => {
        e.preventDefault();
        // if(window.confirm(`Are you sure you want to reserve this location from ${checkin} to ${checkout}?`)) {
        //     setErrors([]);
        //     const newBooking = {
        //         startDate: checkinFormatted,
        //         endDate: checkoutFormatted
        //     }

        //  dispatch(createBookingThunk(newBooking, spotId))
        //    .then(() => history.push(`/spots/${spotId}/booking-confirmation`, {
        //             newBooking,
        //             name: spot.name,
        //             price: spot.price,
        //             cleaningFee: cleaning_fee,
        //             serviceFee: service_fee,
        //             guests,
        //             bookingLength
        //         }))
        //    .catch(async (res) => {
        //      const data = await res.json();
        //      if(data.statusCode === 404) {
        //        history.push('/404')
        //      }
        //      if (data && data.errors) {
        //            setErrors(Object.values(data.errors))
        //            console.log(errors)
        //        } else if (data.message) {
        //            setErrors([data.message])
        //        }
        //    });
        // }
    }

    return (
        <div className='edit_booking_container top flex'>
        <form className='edit_booking_form flex' onSubmit={handleSubmit}>
            <h3>Edit Your Booking</h3>
            <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='edit_booking_checkin'>
                <label className='flex'>
                    <span className='input_label' id="edit_checkin_label">CHECK IN</span>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      required
                      id="edit_booking_checkin_input"
                      />
                </label>
            </div>
            <div className='edit_booking_checkout'>
                <label className='flex'>
                    <span className='input_label' id="edit_checkout_label">CHECK OUT</span>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      required
                      id="edit_booking_checkout_input"
                      />
                </label>
            </div>
            {/* <div className='edit_booking_guests'>
                <label className='flex'>
                    <span className='input_label' id="edit_guests_label">GUESTS</span>
                    <input
                      type="number"
                      min={1}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      required
                      id="edit_booking_guests_input"
                      />
                </label>
            </div> */}

            <button type="submit" className='edit_booking_confirm_btn'>Confirm Changes</button>
        </form>
        <button className='delete_booking_btn'>Delete Booking</button>
    </div>
    )

}

export default EditBooking
