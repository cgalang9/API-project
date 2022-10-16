import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import Reviews from '../Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.currentSpot)
    const sessionUser = useSelector(state => state.session.user);
    //show edit link only if current user is owner
    let isOwner = false
    if (sessionUser && spot && sessionUser.id === spot.ownerId && isOwner === false) {
        isOwner = (true)
    }

    return(
        <>
        {spot && (
            <div className='spot_details_container'>
                <h1>{spot.name}</h1>
                <div>{spot.address}</div>
                <div>{spot.city}, {spot.city}</div>
                <div>{spot.country}</div>
                <div>{spot.description}</div>
                {isOwner && (
                    <div>(<NavLink to={`/spots/${spotId}/edit`}>Edit Listing</NavLink>)</div>
                )}
                <div>${spot.price}</div>
                <div>{spot.numReviews} reviews</div>
                <div><i className="fa-sharp fa-solid fa-star"/>{spot.avgStarRating}</div>
                {spot.SpotImages && (
                    spot.SpotImages.map(img => (
                        <img src={img.url} alt="spot" className='spot_details_img' key={img.id}/>
                    ))
                )}
                <div className='reviews_header'>
                    <div><i className="fa-sharp fa-solid fa-star"/>{spot.avgStarRating}</div>
                    <div style={{ fontSize: 3 }}><i class="fa-solid fa-circle"/></div>
                    <div>{spot.numReviews} reviews</div>
                </div>
                <Reviews />
            </div>
        )}
        </>
    )
}

export default SpotDetails
