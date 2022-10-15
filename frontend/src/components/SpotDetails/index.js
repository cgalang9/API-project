import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import './SpotDetails.css'

function SpotDetails() {
    const sessionUser = useSelector(state => state.session.user);

    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch])

    const spot = useSelector(state => state.currentSpot)

    return(
        <>
        {spot && (
            <div className='spot_details_container'>
                <h1>{spot.name}</h1>
                <div>{spot.address}</div>
                <div>{spot.city}, {spot.city}</div>
                <div>{spot.country}</div>
                <div>{spot.description}</div>
                <div>(<NavLink to={`/spots/${spotId}/edit`}>Edit Listing</NavLink>)</div>
                <div>${spot.price}</div>
                <div>{spot.numReviews} reviews</div>
                <div><i className="fa-sharp fa-solid fa-star"/>{spot.avgStarRating}</div>
                {spot.SpotImages && (
                    spot.SpotImages.map(img => (
                        <img src={img.url} alt="spot" className='spot_details_img' key={img.id}/>
                    ))
                )}
            </div>
        )}
        </>
    )
}

export default SpotDetails
