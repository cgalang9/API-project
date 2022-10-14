import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpotsThunk } from '../../store/spots'
import './SpotsDisplay.css'

function SpotsDisplay() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    console.log(spotsArr)

    return (
        <div className='spots_display_container'>
            <h1>spots</h1>
            <ul className='spots_list'>
                {spotsArr.length > 0 && (
                    spotsArr.map(spot => (
                        <li>{spot.city}</li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default SpotsDisplay
