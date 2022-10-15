import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import { useHistory } from "react-router-dom";
import './SpotsDisplay.css'

function SpotsDisplay() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)


    return (
        <div className='spots_display_container'>
            <ul className='spots_list'>
                {spotsArr.length > 0 && (
                    spotsArr.map(spot => (
                        <li key={spot.id} className='spot_container' onClick={() => {history.push(`/spots/${spot.id}`)}}>
                            <img src={spot.previewImage || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt="spot" className='spot_img'/>
                            <div className='spot_container_header'>
                                <div className='spot_location'>{spot.city}, {spot.state}</div>
                                <div className='spot_avgStars'>
                                    <i className="fa-sharp fa-solid fa-star"/>
                                    <div>{(spot.avgRating && spot.avgRating.toFixed(2)) || "New"}</div>
                                </div>
                            </div>
                            <div className='spot_distace'>300 miles away</div>
                            <div className='spot_miles'>Oct 24-29</div>
                            <div className='spot_price'><span className='span_price'>${spot.price}</span> per night</div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default SpotsDisplay
