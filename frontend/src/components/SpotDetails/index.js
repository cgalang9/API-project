import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/spots'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch])

    const spot = useSelector(state => state.spots.spots)
    if(spot) console.log(spot.SpotImages)

    return(
        <>
        {spot && (
            <div className='spot_details_container'>
                <h1>{spot.name}</h1>
                <div>{spot.address}</div>
                <div>{spot.city}, {spot.city}</div>
                <div>{spot.country}</div>
                <div>{spot.description}</div>
                <div>${spot.price}</div>
                <div>{spot.numReviews} reviews</div>
                <div><i className="fa-sharp fa-solid fa-star"/>{spot.avgStarRating}</div>
                {spot.SpotImages.length > 0 && (
                    spot.SpotImages.map(img => (
                        <img src={img.url} alt="spot" className='spot_details_img'/>
                    ))
                )}
            </div>
        )}
        </>
    )
}

export default SpotDetails
