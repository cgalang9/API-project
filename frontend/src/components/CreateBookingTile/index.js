import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { getAllBookingsThunk, createBookingThunk } from '../../store/bookings';
import "./CreateBookingTile.css";

function CreateBookingTile({ spot, prevImgUrl }) {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState([]);
  const [bookingLength, setBookingLength] = useState(1);

  // const dispatch = useDispatch()
  const history = useHistory();
  const { spotId } = useParams();

  const cleaning_fee = 100;
  const service_fee = 100;

  let checkinFormatted;
  if (checkin) {
    checkinFormatted = new Date(checkin).toISOString().split("T")[0];
  }

  let checkoutFormatted;
  if (checkout) {
    checkoutFormatted = new Date(checkout).toISOString().split("T")[0];
  }

  useEffect(() => {
    if (checkin && checkout) {
      if (checkin < checkout) {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const diff = checkoutDate.getTime() - checkinDate.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        setBookingLength(days);
      } else {
        setBookingLength(1);
      }
    }
  }, [checkin, checkout]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    if (checkinFormatted >= checkoutFormatted) {
      setErrors(["Check in date cannot be on or before checkout date"]);
    } else if (checkinFormatted < new Date().toLocaleDateString("fr-CA")) {
      setErrors(["Can not make booking in the past"]);
    } else if (checkoutFormatted < new Date().toLocaleDateString("fr-CA")) {
      setErrors(["Can not make booking in the past"]);
    } else {
      const newBooking = {
        startDate: checkinFormatted,
        endDate: checkoutFormatted,
      };

      history.push(`/spots/${spotId}/booking-confirmation`, {
        newBooking,
        name: spot.name,
        price: spot.price,
        avgStarRating: spot.avgStarRating,
        numReviews: spot.numReviews,
        cleaningFee: cleaning_fee,
        serviceFee: service_fee,
        prevImgUrl,
        guests,
        bookingLength,
      });
    }

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
    //             avgStarRating: spot.avgStarRating,
    //             numReviews: spot.numReviews,
    //             cleaningFee: cleaning_fee,
    //             serviceFee: service_fee,
    //             prevImgUrl,
    //             guests,
    //             bookingLength,

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
  };

  return (
    <div className="create_booking_tile">
      <div className="create_booking_tile_head">
        <div className="create_booking_tile_head_left">
          <span style={{ fontSize: 25 }}>${spot.price}</span> night
        </div>
        <div className="create_booking_tile_head_right">
          <span style={{ fontSize: 10 }}>
            <i className="fa-sharp fa-solid fa-star" />
          </span>
          <div className="create_booking_tile_head_reviews">
            {(spot.avgStarRating && spot.avgStarRating.toFixed(2)) ||
              (spot.numReviews > 0 && "0.00") ||
              "New"}
          </div>
          <div style={{ fontSize: 3 }}>
            <i className="fa-solid fa-circle" />
          </div>
          <div>{spot.numReviews} reviews</div>
        </div>
      </div>

      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <form className="create_booking_tile_inputs" onSubmit={handleSubmit}>
        <div className="create_booking_tile_dates">
          <div className="create_booking_tile_checkin">
            <label className="flex">
              <span className="input_label" id="checkin_label">
                CHECK IN
              </span>
              <input
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                required
                id="create_booking_tile_checkin_input"
              />
            </label>
          </div>
          <div className="create_booking_tile_checkout">
            <label className="flex">
              <span className="input_label" id="checkout_label">
                CHECK OUT
              </span>
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

        <div className="create_booking_tile_guests">
          <label className="flex">
            <span className="input_label" id="guests_label">
              GUESTS
            </span>
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

        <div className="create_booking_tile_reserve">
          <button type="submit" className="create_booking_tile_reserve_btn">
            Reserve
          </button>
          <div>You won't be charged yet</div>
        </div>
      </form>

      <div className="fees_list">
        <div className="fees_item">
          <div className="fees_item_title">
            ${spot.price} x {bookingLength} night
          </div>
          <div className="fees_item_price">${spot.price * bookingLength}</div>
        </div>
        <div className="fees_item">
          <div className="fees_item_title">Cleaning fee</div>
          <div className="fees_item_price">${cleaning_fee}</div>
        </div>
        <div className="fees_item">
          <div className="fees_item_title">Service fee</div>
          <div className="fees_item_price">${service_fee}</div>
        </div>
      </div>

      <hr />

      <div className="create_booking_tile_total_fees">
        <div className="fees_item_title">Total before taxes</div>
        <div className="fees_item_price">
          ${spot.price * bookingLength + cleaning_fee + service_fee}
        </div>
      </div>
    </div>
  );
}

export default CreateBookingTile;
