import './CreateBookingTile.css'

function CreateBookingTile({ spot }) {
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
        </div>
    )
}

export default CreateBookingTile
