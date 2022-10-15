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

    const spots = useSelector(state => state.spots.spots)

    console.log(spots)
    return(
        <div className='spot_details_container'>
            <h1>spot 1</h1>
        </div>
    )
}

export default SpotDetails
