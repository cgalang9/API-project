import { useEffect, useState } from 'react'
import './CreateBookingTile.css'

function CreateBookingTile({ spot }) {
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [guests, setGuests] = useState(1)
    const [errors, setErrors] = useState([])
    const [bookingLength, setBookingLength] = useState(1)

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

    const cleaning_fee = 100
    const service_fee = 100

    return (
        <div className='create_booking_tile'>
            <div className='create_booking_tile_head' >
                <div className='create_booking_tile_head_left'>
                    <span style={{ fontSize: 25 }}>${spot.price}</span>  night
                </div>
                <div className='create_booking_tile_head_right'>
                    <span style={{ fontSize: 10 }}><i className="fa-sharp fa-solid fa-star"/></span>
                    <div className='create_booking_tile_head_reviews'>
                        {(spot.avgStarRating && spot.avgStarRating.toFixed(2)) || (spot.numReviews > 0 && "0.00") || "New"}
                    </div>
                    <div style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></div>
                    <div>{spot.numReviews} reviews</div>
                </div>
            </div>

            <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <div className='create_booking_tile_inputs'>
                <div className='create_booking_tile_dates'>
                    <div className='create_booking_tile_checkin'>
                        <label className='flex'>
                            <span className='input_label' id="checkin_label">CHECK IN</span>
                            <input
                              type="date"
                              value={checkin}
                              onChange={(e) => setCheckin(e.target.value)}
                              required
                              id="create_booking_tile_checkin_input"
                              />
                        </label>
                    </div>
                    <div className='create_booking_tile_checkout'>
                        <label className='flex'>
                            <span className='input_label' id="checkout_label">CHECK OUT</span>
                            <input
                              type="date"
                              value={checkout}
                              onChange={(e) => setCheckout(e.target.value)}
                              required
                              id="create_booking_tile_checkout_input"
                              />
                        </label>
                    </div>
                </div>

                <div className='create_booking_tile_guests'>
                    <label className='flex'>
                        <span className='input_label' id="guests_label">GUESTS</span>
                        <input
                          type="number"
                          min={1}
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          required
                          id="create_booking_tile_guests_input"
                          />
                    </label>
                </div>

            </div>

            <div className='create_booking_tile_reserve'>
                <button className='create_booking_tile_reserve_btn'>Reserve</button>
                <div>You won't be charged yet</div>
            </div>

            <div className='fees_list'>
                <div className='fees_item'>
                    <div className='fees_item_title'>${spot.price} x {bookingLength} night</div>
                    <div className='fees_item_price'>${spot.price * bookingLength}</div>
                </div>
                <div className='fees_item'>
                    <div className='fees_item_title'>Cleaning fee</div>
                    <div className='fees_item_price'>${cleaning_fee}</div>
                </div>
                <div className='fees_item'>
                    <div className='fees_item_title'>Service fee</div>
                    <div className='fees_item_price'>${service_fee}</div>
                </div>
            </div>

            <hr />

            <div className='create_booking_tile_total_fees'>
                <div className='fees_item_title'>Total before taxes</div>
                <div className='fees_item_price'>${spot.price + cleaning_fee + service_fee}</div>
            </div>
        </div>
    )
}

export default CreateBookingTile
