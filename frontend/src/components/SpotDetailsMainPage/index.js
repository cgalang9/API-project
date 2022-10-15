import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Route } from 'react-router-dom'
import { getSpotThunk } from '../../store/spots'
import SpotDetails from '../SpotDetails'
import EditSpotForm from '../EditSpotForm'

function SpotDetailsMainPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spots.spots)
    console.log(spot)

    return(
        <>
            <Route exact path="/spots/:spotId">
                <SpotDetails spot={spot} />
            </Route>
            <Route exact path="/spots/:spotId/edit">
                <EditSpotForm spot={spot} />
            </Route>
        </>
    )
}

export default SpotDetailsMainPage
